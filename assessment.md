

* REPOSITORY PATTERN
- Em ví dụ 1 module để giải thích về cách em áp dụng pattern này những module khác cũng tương tự.

Tài liệu này giải thích rõ cách tách data access (Repository) ra khỏi business logic (Service) và cách NestJS sử dụng Dependency Injection để nối chuỗi: Controller -> Service -> Repository -> Sequelize Model.
Mục tiêu cụ thể:
Trình bày repository pattern đang dùng.
Giải thích CATEGORY_TOKEN và cơ chế useClass.
Cung cấp ví dụ code (đủ để reviewer chạy thử API tạo category bằng UUIDv4).
Hướng dẫn xử lý migration khi đổi sang UUID.

entities/category.entity.ts — Sequelize entity (Model) cho categories (UUID)
dto/create-category.dto.ts — DTO dùng để validate input
repositories/categories.repository.ts — Interface + Implementation truy xuất DB
categories.service.ts — Business logic, inject repository qua token
categories.controller.ts — HTTP endpoints
categories.module.ts — đăng ký providers, imports, controllers


Cách NestJS khởi tạo & inject
1.Register providers: Nest đọc Module — đăng ký SequelizeModule.forFeature([Category]) (tạo provider cho model Category), CategoriesService, và provider token { provide: CATEGORY_TOKEN, useClass: CategoriesRepository }.

2.Khi cần CategoriesController: Nest tạo CategoriesController → cần CategoriesService → Nest sẽ tạo CategoriesService.

3.Khi tạo CategoriesService: Nest kiểm tra constructor, thấy param @Inject(CATEGORY_TOKEN) → lookup token CATEGORY_TOKEN trong container.

4.Tìm provider cho token: Nest thấy useClass: CategoriesRepository → cần tạo instance CategoriesRepository.

5.Tạo CategoriesRepository: Nest kiểm tra constructor, thấy @InjectModel(Category) → tìm provider model Category (đã register ở bước 1) và inject.

6.Sau khi CategoriesRepository sẵn sàng, Nest inject instance đó vào CategoriesService và hoàn tất chain.



Sơ đồ luồng :
Client -> Controller -> Service -> (INJECTED) Repository -> Sequelize Model -> Database
Ý tưởng: service chỉ phụ thuộc vào abstraction (interface) chứ không phụ thuộc vào implementation.

export interface CategoriesFunctions {
findAll(): Promise<Category[]>;
create(createCategoryDto: CreateCategoryDto): Promise<Category>;
}

export class CategoriesRepository implements CategoriesFunctions {
constructor(
@InjectModel(Category)
private categoryModel: typeof Category,
) {}
}



-IMPLEMENTATION

export class CategoriesRepository implements CategoriesFunctions {
constructor(
@InjectModel(Category)
private categoryModel: typeof Category,
) {}
async findAll(): Promise<Category[]> {
return await this.categoryModel.findAll({ order: [['name', 'ASC']] });
}

async create(categoryData: CreateCategoryDto): Promise<Category> {
return await this.categoryModel.create({ name: categoryData.name } as Category);
}
}

NestJS dùng metadata runtime để quản lý dependency; 
Interface bị mất khi compile, nên không thể Inject theo interface. Vì vậy ta tạo 1 token để đăng ký implementation.

providers: [
CategoriesService,
{ provide: CATEGORY_TOKEN, useClass: CategoriesRepository },
]

useClass: khi có ai đó yêu cầu CATEGORY_TOKEN, Nest sẽ tạo CategoriesRepository và dùng instance đó làm giá trị cho token.

sequenceDiagram
    Controller->>Service: request
    Service->>DI Container: inject (CATEGORY_TOKEN)
    DI Container->>Repository: useClass => instantiate
    Repository->>SequelizeModule: @InjectModel(Category)
    SequelizeModule->>Database: model mapping
    Repository-->>Service: return instance
    Service-->>Controller: return response




* Search Products API*
1. Mục đích
Cho phép người dùng tìm kiếm sản phẩm (full-text search) theo nhiều tiêu chí (từ khóa, danh mục).

2. Endpoint
GET /products/search

3. Cách hoạt động

Người dùng gửi request kèm query parameters.

Hệ thống sẽ:
Lấy tất cả product
So sánh params tìm kiếm với filed của products
những cái = với params hệ thống sẽ lấy dữ liệu của products đó.
trả ra kết quả

import CategoryEntity from "../../domain/entities/category.entity.js";

export default class CategoryService {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    async createCategory(data) {
        if (!data.name) { throw new Error("Name is required"); }

        const category = new CategoryEntity(data);
        return await this.categoryRepository.save(category);
    }

    async getCategoriesByUserId(userId){
        return await this.categoryRepository.findByUserId(userId);
    }

    async getAllCategories() {
        return await this.categoryRepository.findAll();
    }

    async getCategoryById(id, userId) {
        const category = await this.categoryRepository.findById(id);
        if (!category) throw new Error("Category not found");
        if (category.userId !== userId) throw new Error("Not authorized to view this category");
        return category;
    }

    async updateCategory(id, data, userId) {
        const existingCategory = await this.categoryRepository.findById(id);
        if (!existingCategory) throw new Error("Category not found");
        if (existingCategory.userId !== userId) throw new Error("Not authorized to update this category");

        return await this.categoryRepository.update(id, data);
    }

    async deleteCategory(id, userId) {
        const existingCategory = await this.categoryRepository.findById(id);
        if (!existingCategory) throw new Error("Category not found");
        if (existingCategory.userId !== userId) throw new Error("Not authorized to delete this category");

        return await this.categoryRepository.delete(id);
    }
}

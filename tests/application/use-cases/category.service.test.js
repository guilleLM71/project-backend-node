import { jest } from '@jest/globals';
import CategoryService from '../../../src/application/use-cases/category.service.js';

describe('CategoryService', () => {
    let categoryService;
    let mockCategoryRepository;

    beforeEach(() => {
        mockCategoryRepository = {
            save: jest.fn(),
            findByUserId: jest.fn(),
            findAll: jest.fn(),
            findById: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        };
        categoryService = new CategoryService(mockCategoryRepository);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    // ─── createCategory (Happy Path) ────────────────────────────
    describe('createCategory', () => {
        it('should create a category successfully', async () => {
            const categoryData = { name: 'Ideas', description: 'Categoría para ideas creativas', userId: 'user1' };
            const savedCategory = { id: '1', ...categoryData };
            mockCategoryRepository.save.mockResolvedValue(savedCategory);

            const result = await categoryService.createCategory(categoryData);

            expect(mockCategoryRepository.save).toHaveBeenCalled();
            expect(result).toEqual(savedCategory);
            expect(result.id).toBe('1');
            expect(result.name).toBe('Ideas');
            expect(result.description).toBe('Categoría para ideas creativas');
            expect(result.userId).toBe('user1');
        });

        it('should create a category without description (optional field)', async () => {
            const categoryData = { name: 'Trabajo', userId: 'user1' };
            const savedCategory = { id: '2', name: 'Trabajo', description: null, userId: 'user1' };
            mockCategoryRepository.save.mockResolvedValue(savedCategory);

            const result = await categoryService.createCategory(categoryData);

            expect(mockCategoryRepository.save).toHaveBeenCalled();
            expect(result).toEqual(savedCategory);
            expect(result.description).toBeNull();
        });

        it('should throw an error if name is missing', async () => {
            const categoryData = { description: 'Sin nombre', userId: 'user1' };

            await expect(categoryService.createCategory(categoryData)).rejects.toThrow('Name is required');
            expect(mockCategoryRepository.save).not.toHaveBeenCalled();
        });
    });

});

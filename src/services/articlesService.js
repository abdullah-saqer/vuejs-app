import {api} from '@/utilities/apiService';
const STORAGE_NAME = "articles";
const apiService = api(STORAGE_NAME);

export default {
    getArticle(id) {
        return apiService.getItem(id);
    },
    getArticles() {
        return apiService.getItems();
    },
    createArticle(data) {
        return apiService.post(data);
    },
    updateArticle(data) {
        return apiService.update(data.id,data);
    },
    deleteArticle(id) {
        return apiService.delete(id);
    }
}
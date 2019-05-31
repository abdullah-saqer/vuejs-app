<template>
    <v-layout row wrap>
        <v-flex mb-3 xs12 d-flex align-center> 
            <h1 class="headline">Articles Listing</h1>
            <div class="text-xs-right">
               <v-btn primary @click="createArticle">Create Article</v-btn>
            </div>
        </v-flex>
        <v-flex mb-3 xs12 d-flex align-center> 
            <v-data-table
                :headers="articles.headers"
                :items="articles.articlesList"
                class="elevation-1"
            >
                <template v-slot:items="props">
                    <td class="text-xs-center"><a @click.prevent="viewArticle(props.item.id)">{{ props.item.title }}</a></td>
                    <td class="text-xs-center">{{ props.item.creationDate }}</td>
                    <td class="text-xs-center">{{ props.item.author }}</td>
                    <td class="text-xs-center">
                        <v-btn flat icon @click="editArticle(props.item.id)"><v-icon>edit</v-icon></v-btn>
                        <v-btn flat icon @click="deleteArticle(props.item.id)"><v-icon>delete</v-icon></v-btn>
                    </td>
                </template>
            </v-data-table>
        </v-flex>
        <v-dialog v-model="viewArticleDialog" max-width="900">
            <v-card class="articleModal">
                <v-toolbar card dark color="primary">
                <v-btn icon dark @click.native="viewArticleDialog = false">
                    <v-icon>close</v-icon>
                </v-btn>
                <v-toolbar-title>{{selectedArticle.title}}</v-toolbar-title>
                </v-toolbar>
                <v-card-text class="pa-0 articleModalContent">
                    <div class="articleVwrapper pa-4">
                        <img id="articleImage" class="mb-4 d-block mx-auto" :src="selectedArticle.image.base64" v-if="!!selectedArticle.image.base64" />
                        <div class="articleContent" v-html="selectedArticle.content"></div>
                    </div>
                </v-card-text>
            </v-card>
        </v-dialog>
        <confirmation v-model="confirmationDialog" title="Warning" trueBtnText="Delete" text="Are you sure you want to delete this item?" @onSuccess="deleteCallBack"></confirmation>
    </v-layout>
</template>

<script>
import Confirmation from '@/components/confirmation/confirmation.vue';
import articlesService from '@/services/articlesService'
export default {
    name: "articles-listing",
    data() {
        return {
            articles: {
                headers : [
                    { text: 'Title', value: 'title', align: 'center' },
                    { text: 'Creation Date', value: 'date', align: 'center'  },
                    { text: 'Author', value: 'autor', align: 'center'  },
                    { text: 'actions', value: 'avtions',sortable: false, align: 'center'  },
                ],
                articlesList: []
            },
            confirmationDialog: false,
            articleId: null,
            viewArticleDialog: false,
            selectedArticle: {
                title: '',
                content: '',
                image: {
                    base64: ''
                }
            }
        }
    },
    created() {
        this.articles.articlesList = articlesService.getArticles();
    },
    methods: {
        editArticle(id) {
            this.$router.push({ name: 'edit-article', query: {id} })
        },
        deleteArticle(id) {
            this.articleId = id;
            this.confirmationDialog = true;
        },
        deleteCallBack() {
            const result = articlesService.deleteArticle(this.articleId);
            if(result.status == "success") {
                this.articles.articlesList = result.data;
            } else {
                
            }
        },
        createArticle() {
            this.$router.push('create-article');
        },
        viewArticle(id) {
            const result = articlesService.getArticle(id);
            if(result) {
                this.selectedArticle = result;
                this.viewArticleDialog = true;
            }
        }
    },
    components: {
        Confirmation
    }
}
</script>
<style>
    #articleImage {
        max-height: 350px;
        max-width: 100%;
    }
</style>


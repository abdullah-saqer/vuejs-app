<template>
    <v-layout row wrap>
        <v-flex mb-3 xs12 d-flex align-center>
            <h1 class="headline">
                <v-btn icon flat @click="$router.push('/')">
                    <v-icon>arrow_back</v-icon>
                </v-btn>
                {{pageTitle}}
            </h1>
        </v-flex>
        <v-flex mb-3 xs12 d-flex align-center> 
          <v-card class="pa-4">
            <v-card-text>
              <v-form
                  ref="articleForm"
                  v-model="valid"
                  lazy-validation
              >
                <v-text-field 
                  name="title"
                  v-model="article.title"
                  :rules="titleRules"
                  required
                  label="Article Title"
                  type="text"
                  class="mb-4"
                  autocomplete="off"
                ></v-text-field>
                <quill-editor 
                  v-model="article.content"
                  ref="myQuillEditor"
                  :class="!!contentError ? 'mb-2' : 'mb-4'"
                  @change="ValidateContent"
                >
                </quill-editor>
                <div class="v-messages__message error--text" style="font-size: 12px;">{{contentError}}</div>
                <v-text-field 
                  label="Select Image" 
                  @click='pickFile' 
                  v-model='article.image.name' 
                  prepend-icon='attach_file'
                  readonly
                  :class="!article.image.base64 ? 'mb-4' : ''"
                >
                </v-text-field>
                <img id="imagePreview" class="d-block mx-auto" :src="article.image.base64" v-if="article.image.base64" :class="article.image.base64 ? 'mb-4' : ''" />
                <input
                  type="file"
                  style="display: none"
                  ref="imageInput"
                  accept="image/*"
                  @change="onFilePicked"
                >
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn 
                  color="primary"
                  :disabled="!valid || !!contentError"
                  @click="validate"
              >
                {{btnText}}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
  import 'quill/dist/quill.core.css';
  import 'quill/dist/quill.snow.css';
  import 'quill/dist/quill.bubble.css';

  import { quillEditor } from 'vue-quill-editor';
  import { generateId, formateDate } from '@/utilities/functions';
  import articlesService from '@/services/articlesService';

  export default {
    name: 'article-management',
    data: () => ({
      pageTitle: "Create Article",
      btnText: 'Create',
      valid: true,
      article: {
        id: null,
        title: '',
        content: '',
        author: '',
        author: '',
        image: {
          name: '',
          base64: '',
        }
      },
      titleRules: [
        v => !!v.trim() || 'Title is required',
      ],
      maxFileSize: 4,
      imageError: '',
      contentError: '',
    }),
    created() {
      if(this.$route.name == "edit-article") {
        const result = articlesService.getArticle(this.$route.query.id);
        if(result) {
          this.article = result;
          this.pageTitle = "Update Article",
          this.btnText = 'Update';
        } else {
          this.$store.dispatch('snackbar', {
              color: 'error',
              text: "Not valid article"
          });
          this.$router.push('/');
        }
      }
    },
    methods: {
      pickFile() {
        this.$refs.imageInput.click();
      },
      onFilePicked() {
        const file = this.$refs.imageInput.files[0];
        this.imageError = '';
        if(!file) {
          return false;
        }
        if(!/image\/.+/.test(file.type)) {
          this.imageError = 'Only image files allowed (.gif, .jpeg, .jpg, .png)';
        }
        if(file.size > (this.maxFileSize * 1024 * 1024) && !!this.imageError ) {
          this.imageError = `Maximum file size is ${this.maxFileSize}MB`;
        }
        if(this.imageError) {
          this.$store.dispatch('snackbar', {
              color: 'error',
              text: this.imageError
          });
          return false;
        }
        this.article.image.name = file.name;
        this.imageToBase64(file);
      },
      imageToBase64(file) {
        var that = this;
        const reader = new FileReader();
        reader.onload = ((theFile) => {
          return function(e) {
            that.article.image.base64 = e.target.result;
          };
        })(file);
        return reader.readAsDataURL(file);
      },
      validate () {
        if (this.$refs.articleForm.validate() & this.ValidateContent()) {
            if(this.article.id)
              this.updateArticle();
            else
              this.createArticle();
        }
      },
      ValidateContent() {
        if(!this.article.content.trim()) {
          this.contentError = 'Content is required';
          return false;
        } else {
          this.contentError = '';
          return true;
        }
      },
      createArticle() {
          this.article.id = generateId(this.article.title + new Date().getTime());
          this.article.creationDate = formateDate(new Date(),"#D#/#M#/#YYYY#");
          this.article.author = this.$store.getters.user.firstName +" "+this.$store.getters.user.lastName;
          const result = articlesService.createArticle(this.article);
          if(result) {
            this.$store.dispatch('snackbar', {
                color: 'success',
                text: `Article was created successfully`
            }); 
            this.$router.push('/');
          } else {
            this.$store.dispatch('snackbar', {
                color: 'error',
                text: "An error occurred, please try again later"
            });
          }
      },
      updateArticle() {
        const result = articlesService.updateArticle(this.article);
          if(result) {
            this.$store.dispatch('snackbar', {
                color: 'success',
                text: `Article was updated successfully`
            }); 
            this.$router.push('/');
          } else {
            this.$store.dispatch('snackbar', {
                color: 'error',
                text: "An error occurred, please try again later"
            });
          }
      }
    },
    components: {
      quillEditor
    }
  }
</script>

<style>
  .ql-editor {
    min-height: 300px;
  }
  #imagePreview {
    max-height: 350px;
    max-width: 100%;
  }
</style>

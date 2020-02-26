<template>
 <div class='container'>
    <InputGroup type="text" label="Name" placeholder= "Enter your name" v-model="editedUserData.name" />
    <InputGroup type="text" label="Username" placeholder= "Change your username" v-model="editedUserData.username" />
    <InputGroup type="text" label="Headline" placeholder= "Change your headline" v-model="editedUserData.headline" />
    <TextAreaGroup label="bio" placeholder="Update your bio" v-model="editedUserData.bio" />
 </div>
</template>
 
<script lang='ts'>
import { Component, Vue} from 'vue-property-decorator'; 
import InputGroup from '../Forms/InputGroup.vue';
import TextAreaGroup from '../Forms/TextAreaGroup.vue'

@Component({
  components: {
    InputGroup,
    TextAreaGroup,
  }
})
export default class ProfileSettings extends Vue { 
  editedUserData = {
    name: '',
    username: '',
    headline: '',
  }
}
</script>
 
<style>
</style>
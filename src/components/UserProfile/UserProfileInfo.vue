<template>
  <div class="profile-info">
    <div class="profile-photo">
      <img :src="user.profilePhotoUrl" alt="">
      <p>@{{user.username}}</p>
    </div>

    <div>
      <p>{{user.name}}</p>
      <p>{{user.headline}}</p>
      <p>{{user.bio}}</p>
    </div>

    <div class="interests">
      <p>#Tech</p>
      <p>#Finance</p>
    </div>

    <button>
      Edit profile
    </button>

  </div>
</template>

<script lang="ts">
import { Component, Vue} from 'vue-property-decorator'; 
import { user } from '../../mock-data';
import {  User} from '../../types';
@Component
export default class UserProfileInfo extends Vue { 
  // TODO Probably access the user profile form the state or something
  user: User = user;
 }
</script>

<style>

</style>
<template>
  <div class="edit_container">
    <van-nav-bar title="个人信息" left-arrow @click-left="$router.back()" />
    <van-cell center title="头像" is-link @click="onSelectFile">
      <van-image class="userImg" round :src="user.photo" />
      <input type="file" ref="file" style="display:none" @change="uploadFile" />
    </van-cell>
    <van-cell title="昵称" is-link :value="user.name" @click="isNameEditShow=true" />
    <van-cell title="性别" is-link :value="user.gender?'女':'男'" @click="isGenderEditShow=true" />
    <van-cell title="生日" is-link :value="user.birthday" @click="isBirthdayEditShow=true" />
    <van-popup v-model="isNameEditShow" position="bottom">
      <EditName :userName="user.name" @close="isNameEditShow=false" @onsave="onSaveName"></EditName>
    </van-popup>
    <van-action-sheet
      v-model="isGenderEditShow"
      :actions="genders"
      cancel-text="取消"
      @cancel="isGenderEditShow=false"
      @select="onSelectGender"
    />
    <van-popup v-model="isBirthdayEditShow" position="bottom">
      <EditBirthday
        @close="isBirthdayEditShow=false"
        @onsave="onSaveBirthday"
      ></EditBirthday>
    </van-popup>
    <van-image-preview
      v-model="isPhotoShow"
      :images="images"
      @close="file.value=''"
    >
      <van-nav-bar
        slot="cover"
        left-text="取消"
        right-text="确定"
        @click-left="isPhotoShow=false"
        @click-right="onPhotoConfirm"
      ></van-nav-bar>
    </van-image-preview>
  </div>
</template>

<script>
import EditName from '@/components/editprofile/editname'
import EditBirthday from '@/components/editprofile/editbirthday'
import { getProfile, editProfile, editPhoto } from '@/api/user'
import dayjs from 'dayjs'
export default {
  name: 'UserProfile',
  data () {
    return {
      isNameEditShow: false,
      isGenderEditShow: false,
      isBirthdayEditShow: false,
      isPhotoShow: false,
      images: [],
      user: {},
      genders: [{ name: '男' }, { name: '女' }]
    }
  },
  components: {
    EditName,
    EditBirthday
  },
  methods: {
    async onLoadProfile () {
      try {
        const { data } = await getProfile()
        this.user = data.data
      } catch (error) {
        console.log(error)
        this.$toast.fail('请求失败')
      }
    },
    async onSaveName (value) {
      try {
        await editProfile({
          name: value
        })
        this.isNameEditShow = false
        this.user.name = value
        this.$toast.success('保存成功')
      } catch (error) {
        console.log(error)
        this.$toast.fail('请求失败')
      }
    },
    async onSelectGender (item) {
      const sex = item.name === '男' ? 0 : 1
      try {
        await editProfile({
          gender: sex
        })
        this.isGenderEditShow = false
        this.user.gender = sex
        this.$toast.success('修改成功')
      } catch (error) {
        console.log(error)
        this.$toast.fail('请求失败')
      }
    },
    async onSaveBirthday (value) {
      const date = dayjs(value).format('YYYY-MM-DD')
      try {
        await editProfile({
          birthday: date
        })
        this.user.birthday = date
        this.isBirthdayEditShow = false
        this.$toast.success('修改成功')
      } catch (error) {
        console.log(error)
        this.$toast.fail('请求失败')
      }
    },
    async onPhotoConfirm () {
      try {
        const fd = new FormData()
        fd.append('photo', this.file.files[0])
        const { data } = await editPhoto(fd)
        this.isPhotoShow = false
        this.$toast.success('更新成功')
        this.user.photo = data.data.photo
      } catch (error) {
        console.log(error)
        this.$toast.fail('请求失败')
      }
    },
    onSelectFile () {
      this.file.click()
    },
    uploadFile () {
      const file = this.file.files[0]
      const path = URL.createObjectURL(file)
      this.images = [path]
      this.isPhotoShow = true
    }
  },
  created () {
    this.onLoadProfile()
  },
  computed: {
    file () {
      return this.$refs.file
    }
  }
}
</script>

<style scoped lang="less">
.edit_container {
  .van-nav-bar {
    background-color: #3196fa;
    ::v-deep .van-icon,
    .van-nav-bar__title {
      color: #ffffff;
    }
  }
  .userImg {
    width: 30px;
    height: 30px;
  }
  ::v-deep .van-image-preview__cover{
    position: absolute;
    top:unset;
    left: 0;
    bottom: 0;
    right: 0;
    .van-hairline--bottom{
      background-color: rgb(25, 25, 25);
    }
    .van-nav-bar__text{
      color: white;
    }
  }
}
</style>

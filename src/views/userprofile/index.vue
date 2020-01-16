<template>
  <div class="edit_container">
    <van-nav-bar title="个人信息" left-arrow @click-left="$router.back()" />
    <van-cell center title="头像" is-link>
      <van-image class="userImg" round :src="user.photo" />
    </van-cell>
    <van-cell
      title="昵称"
      is-link
      :value="user.name"
      @click="isNameEditShow=true"
    />
    <van-cell
      title="性别"
      is-link
      :value="user.gender?'女':'男'"
      @click="isGenderEditShow=true"
    />
    <van-cell
      title="生日"
      is-link
      :value="user.birthday"
      @click="isBirthdayEditShow=true"
    />
    <van-popup v-model="isNameEditShow" position="bottom">
      <EditName
        :userName="user.name"
        @close="isNameEditShow=false"
        @onsave="onSaveName"
      ></EditName>
    </van-popup>
    <van-action-sheet
      v-model="isGenderEditShow"
      :actions="genders"
      cancel-text="取消"
      @cancel="isGenderEditShow=false"
      @select="onSelectGender"
    />
    <van-popup
      v-model="isBirthdayEditShow"
      position="bottom"
    >
      <EditBirthday
        @close="isBirthdayEditShow=false"
        @onsave="onSaveBirthday"
      ></EditBirthday>
    </van-popup>
  </div>
</template>

<script>
import EditName from '@/components/editprofile/editname'
import EditBirthday from '@/components/editprofile/editbirthday'
import { getProfile, editProfile } from '@/api/user'
import dayjs from 'dayjs'
export default {
  name: 'UserProfile',
  data () {
    return {
      isNameEditShow: false,
      isGenderEditShow: false,
      isBirthdayEditShow: false,
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
    }
  },
  created () {
    this.onLoadProfile()
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
}
</style>

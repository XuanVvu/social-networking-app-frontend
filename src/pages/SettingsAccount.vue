<script lang="ts" setup>
import InputBase from '@/components/base/InputBase.vue'
import { reactive } from 'vue';

// const formSize = ref<ComponentSize>('default')

const form = reactive({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
})

// const ruleFormRef = ref<FormInstance>()
// const { navigateTo } = useNavigation()
// const onSubmit = async (formEl: FormInstance | undefined) => {
//     await formEl?.validate(async (valid) => {
//         if (!valid) {
//             return;
//         }
//         navigateTo('/login')
//     })
// }

// const rules = reactive<FormRules<RuleForm & { confirmPassword: string; firstName: string; lastName: string }>>({
//     firstName: [
//         { required: true, message: 'Vui lòng nhập firstName', trigger: 'blur' },
//     ],
//     lastName: [
//         { required: true, message: 'Vui lòng nhập lastName', trigger: 'blur' },
//     ],
//     email: [
//         { required: true, message: 'Vui lòng nhập email', trigger: 'blur' },
//         { type: 'email', message: 'Vui lòng nhập đúng địa chỉ email', trigger: 'blur' }
//     ],
//     password: [
//         { required: true, message: 'Vui lòng nhập mật khẩu', trigger: 'blur' },
//         {
//             min: 6,
//             message: 'Mật khẩu phải có ít nhất 6 kí tự',
//             trigger: 'blur'
//         }
//     ],
//     confirmPassword: [
//         { required: true, message: 'Vui lòng xác nhận mật khẩu', trigger: 'blur' },
//         {
//             validator: (rule, value, callback) => {
//                 if (value !== form.password) {
//                     callback(new Error('Mật khẩu không khớp'))
//                 } else {
//                     callback()
//                 }
//             }
//         }
//     ]
// })

</script>
<template>
    <div class="p-[60px]" style="height: calc(100vh - 80px);">
        <div class=" bg-white px-6 py-12 border mb-8 flex items-center justify-between">
            <h1 class="font-bold text-2xl">Thông tin cá nhân</h1>
        </div>

        <div class=" bg-white py-5 px-4 border mb-4">
            <el-form class="flex flex-col gap-3" ref="ruleFormRef" status-icon>
                <el-form-item prop="firstName">
                    <InputBase type="text" placehoder="First name" v-model="form.firstName" />
                </el-form-item>
                <el-form-item prop="firstName">
                    <InputBase type="text" placehoder="Last name" v-model="form.lastName" />
                </el-form-item>
                <el-form-item prop="email">
                    <InputBase type="email" placehoder="Email" v-model="form.email" />
                </el-form-item>
                <el-form-item prop="password">
                    <InputBase type="password" placehoder="Mật khẩu" v-model="form.password" />
                </el-form-item>
                <el-form-item prop="confirmPassword">
                    <InputBase type="password" placehoder="Nhập lại mật khẩu" v-model="form.confirmPassword" />
                </el-form-item>


                <el-form-item>
                    <Button classFromParent="w-full py-6 py-2">
                        Đăng ký
                    </Button>
                </el-form-item>

            </el-form>
        </div>

    </div>
</template>
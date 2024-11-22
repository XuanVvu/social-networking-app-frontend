<script setup lang="ts">
import SettingsScreenCommon from '@/components/settings/SettingsScreenCommon.vue';
import { useIsDirty } from '@/utils/formUtil';
import { FormInstance, FormRules } from 'element-plus';
import { reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useDialog } from '@/utils/useDialog'
import TestDialog from './TestDialog.vue';
import DialogCommon from "@/components/common/DialogCommon.vue"

export interface RuleSettingsAppForm { }
const centerDialogVisible = ref(true)
const i18n = useI18n()

const ruleSettingsApplication = ref<FormInstance | null>(null);
const settingsAppForm = reactive({
    languages: localStorage.getItem('language') || 'en'
})

const form = reactive({ ...settingsAppForm })
const isDirty = useIsDirty(form, settingsAppForm)

const rules = reactive<FormRules<RuleSettingsAppForm>>({})
const submitUpdate = () => {
    if (!ruleSettingsApplication.value) {
        return
    }
    localStorage.setItem('language', settingsAppForm.languages)
    i18n.locale.value = settingsAppForm.languages
    Object.assign(settingsAppForm, form)
}

const { openDialog } = useDialog()
const openDialogTest = () => {
    openDialog(TestDialog)
}

</script>
<template>
    <settings-screen-common label="Install the app">
        <el-form class="settings-application" ref="ruleSettingsApplication" :model="form" :rule="rules"
            @submit.prevent="submitUpdate">
            <el-form-item :label="$t('Languages')">
                <el-select v-model="settingsAppForm.languages">
                    <el-option label="English" value="en" />
                    <el-option label="Tiếng Việt" value="vi" />
                </el-select>
            </el-form-item>

            <el-form-item class="update-btn">
                <el-button class="bg-blue-600 px-5 py-2 rounded-2xl text-white" :disabled="!isDirty"
                    @click="submitUpdate()">
                    {{ $t('Update') }}
                </el-button>
                <el-button @click="openDialogTest()">test dialog</el-button>
            </el-form-item>
        </el-form>
    </settings-screen-common>

    <!-- <div>
        <el-dialog v-model="centerDialogVisible" title="Warning" width="30%" align-center>
            <span>Open the dialog from the center from the screen</span>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="centerDialogVisible = false">Cancel</el-button>
                    <el-button type="primary" @click="centerDialogVisible = false">
                        Confirm
                    </el-button>
                </span>
            </template>
</el-dialog>
</div> -->

    <dialog-common>dsadsads</dialog-common>

</template>

<style>
.settings-application .el-select {
    width: 15%;
}

.update-btn .el-form-item__content {
    justify-content: center;
}
</style>
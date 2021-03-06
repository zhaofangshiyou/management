import Vue from 'vue';

export const focus = Vue.directive('focus',(el, option) => {
    var defClass = 'el-input',defTag = 'input';
    var value = option.value || true;
    if (typeof value === 'boolean')
            value = { cls: defClass, tag: defTag, foc: value };
        else
            value = { cls: value.cls || defClass, tag: value.tag || defTag, foc: value.foc || false };
        if (el.classList.contains(value.cls) && value.foc)
            el.getElementsByTagName(value.tag)[0].focus();
})


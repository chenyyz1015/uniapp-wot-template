# 代码模板

## 移动端 CRUD 列表页

```vue
<script setup lang="ts">
import { getList, createItem, updateItem, deleteItem } from "@/api/modules/<module>";
import type { Item, QueryParams } from "@/api/types/<module>";
import SearchBar from "./components/SearchBar.vue";
import EditPopup from "./components/EditPopup.vue";

definePage({
  name: "<module>",
  layout: "default",
  meta: { titleKey: "<module>.title" },
  style: { navigationBarTitleText: "列表" },
});

const { t } = useLocale();
const toast = useToast();
const dialog = useDialog();
const { hasPermission } = usePermission();

const loading = ref(false);
const list = ref<Item[]>([]);
const total = ref(0);
const queryParams = reactive<QueryParams>({ page: 1, size: 10 });
const popupVisible = ref(false);
const currentItem = ref<Item | null>(null);

const fetchList = async () => {
  loading.value = true;
  try {
    const { data } = await getList(queryParams);
    list.value = data.list;
    total.value = data.total;
  } catch {
    // 统一错误已由拦截器处理
  } finally {
    loading.value = false;
  }
};

const handleSearch = () => {
  queryParams.page = 1;
  fetchList();
};

const handleReset = () => {
  Object.assign(queryParams, { page: 1, size: 10, keyword: "" });
  fetchList();
};

const handleCreate = () => {
  currentItem.value = null;
  popupVisible.value = true;
};

const handleEdit = (row: Item) => {
  currentItem.value = { ...row };
  popupVisible.value = true;
};

const handleDelete = async (id: number) => {
  try {
    await dialog.confirm({ title: t("common.tip"), msg: t("<module>.deleteConfirm") });
    await deleteItem(id);
    toast.success(t("common.deleteSuccess"));
    fetchList();
  } catch {
    // 取消或接口失败
  }
};

const handleSubmit = async (form: Item) => {
  if (form.id) {
    await updateItem(form.id, form);
  } else {
    await createItem(form);
  }
  toast.success(t("common.saveSuccess"));
  popupVisible.value = false;
  fetchList();
};

onShow(() => {
  uni.setNavigationBarTitle({ title: t("<module>.title") });
});

onMounted(() => {
  fetchList();
});
</script>

<template>
  <view class="<module>-page">
    <SearchBar v-model:keyword="queryParams.keyword" @search="handleSearch" @reset="handleReset" />

    <view v-if="hasPermission('<module>:add')" class="<module>-page__toolbar">
      <wd-button type="primary" block @click="handleCreate">
        {{ t("common.add") }}
      </wd-button>
    </view>

    <wd-loading v-if="loading" />

    <view v-else-if="list.length === 0" class="<module>-page__empty">
      <text>{{ t("common.noData") }}</text>
    </view>

    <wd-cell-group v-else border custom-class="<module>-page__list">
      <wd-cell
        v-for="item in list"
        :key="item.id"
        :title="item.name"
        is-link
        @click="handleEdit(item)"
      >
        <template #value>
          <wd-button
            v-if="hasPermission('<module>:delete')"
            size="small"
            type="error"
            plain
            @click.stop="handleDelete(item.id)"
          >
            {{ t("common.delete") }}
          </wd-button>
        </template>
      </wd-cell>
    </wd-cell-group>

    <EditPopup v-model:visible="popupVisible" :item="currentItem" @submit="handleSubmit" />
  </view>
</template>

<style lang="scss" scoped>
.<module>-page {
  @apply box-border px-3 py-4;

  &__toolbar {
    @apply mb-3;
  }

  &__empty {
    @apply py-10 text-center wot-text-text-secondary;
  }

  &__list {
    @apply w-full;
  }
}
</style>
```

## H5 落地页

```vue
<script setup lang="ts">
import HeroSection from "./components/HeroSection.vue";
import FeaturesSection from "./components/FeaturesSection.vue";
import CTASection from "./components/CTASection.vue";

definePage({
  name: "landing",
  layout: "default",
  meta: { titleKey: "landing.title" },
  style: { navigationBarTitleText: "Landing" },
});
</script>

<template>
  <view class="landing-page">
    <HeroSection />
    <FeaturesSection />
    <CTASection />
  </view>
</template>

<style lang="scss" scoped>
.landing-page {
  // 各 Section 内部维护自身间距
}
</style>
```

## 表单弹窗子组件

```vue
<script setup lang="ts">
import type { Item } from "@/api/types/<module>";

const visible = defineModel<boolean>("visible", { default: false });
const { item } = defineProps<{ item: Item | null }>();
const emit = defineEmits<{ (e: "submit", form: Item): void }>();

const { t } = useLocale();
const form = reactive<Item>({
  id: 0,
  name: "",
});

const submitting = ref(false);

const resetForm = () => {
  Object.assign(form, { id: 0, name: "" });
};

const handleConfirm = async () => {
  if (!form.name) {
    useToast().warning(t("<module>.nameRequired"));
    return;
  }
  submitting.value = true;
  try {
    emit("submit", { ...form });
    resetForm();
  } finally {
    submitting.value = false;
  }
};

const handleClose = () => {
  resetForm();
  visible.value = false;
};

watch(visible, (val) => {
  if (val && item) {
    Object.assign(form, item);
  } else if (!val) {
    resetForm();
  }
});
</script>

<template>
  <wd-popup v-model="visible" position="bottom" closable @close="handleClose">
    <view class="edit-popup">
      <text class="edit-popup__title">
        {{ item?.id ? t("common.edit") : t("common.add") }}
      </text>
      <wd-input v-model="form.name" :label="t('<module>.name')" clearable />
      <view class="edit-popup__footer">
        <wd-button plain block @click="handleClose">{{ t("common.cancel") }}</wd-button>
        <wd-button type="primary" block :loading="submitting" @click="handleConfirm">
          {{ t("common.confirm") }}
        </wd-button>
      </view>
    </view>
  </wd-popup>
</template>

<style lang="scss" scoped>
.edit-popup {
  @apply px-4 py-5;

  &__title {
    @apply mb-4 block text-5 font-bold wot-text-text-main;
  }

  &__footer {
    @apply mt-6 grid grid-cols-2 gap-3;
  }
}
</style>
```

## 搜索栏子组件

```vue
<script setup lang="ts">
const keyword = defineModel<string>("keyword", { default: "" });
const emit = defineEmits<{ (e: "search"): void; (e: "reset"): void }>();

const { t } = useLocale();

const handleSearch = () => {
  emit("search");
};

const handleReset = () => {
  keyword.value = "";
  emit("reset");
};
</script>

<template>
  <view class="search-bar">
    <wd-input
      v-model="keyword"
      :label="t('<module>.keyword')"
      :placeholder="t('<module>.keywordPlaceholder')"
      clearable
      @confirm="handleSearch"
    />
    <view class="search-bar__actions">
      <wd-button type="primary" size="small" @click="handleSearch">
        {{ t("common.search") }}
      </wd-button>
      <wd-button plain size="small" @click="handleReset">
        {{ t("common.reset") }}
      </wd-button>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.search-bar {
  @apply mb-3;

  &__actions {
    @apply mt-3 flex gap-2;
  }
}
</style>
```

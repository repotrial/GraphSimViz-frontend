import { createRouter, createWebHistory } from "vue-router";
import * as CONFIG from "./Config"
import Validation from "@/components/Validation.vue";
import Downloads from "@/components/Downloads.vue";
import About from "@/components/About.vue";

const router = createRouter({
    history: createWebHistory(CONFIG.PATH_PREFIX),
    routes: [
        {path: "/", component: Validation},
        {path: "/downloads", component: Downloads},
        {path: "/about", component: About}
    ]
});

export default router

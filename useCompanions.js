import { ref, computed, shallowRef } from 'vue'

const MOCK_DATA = [
    { id: 1, name: "Ahri", game: "LoL", rank: "王者", price: 50, avatar: "https://placehold.co/400x300/e91e63/ffffff?text=Ahri" },
    { id: 2, name: "Jett", game: "Valorant", rank: "赋能", price: 60, avatar: "https://placehold.co/400x300/00bcd4/ffffff?text=Jett" },
    { id: 3, name: "Mercy", game: "三角洲行动", rank: "三角洲巅峰", price: 40, avatar: "https://placehold.co/400x300/ffc107/ffffff?text=Mercy" },
    { id: 4, name: "S1mple", game: "CS:GO", rank: "大地球", price: 100, avatar: "https://placehold.co/400x300/ff5722/ffffff?text=GO" },
]

export function useCompanions() {
    const companions = ref([])
    const loading = ref(false)
    // 使用 shallowRef 优化静态数组
    const categories = shallowRef(['LoL', 'Valorant', '三角洲行动', 'CS:GO'])

    // 异步获取数据
    const fetchAll = async () => {
        loading.value = true
        // 模拟网络延迟
        await new Promise(r => setTimeout(r, 600))
        companions.value = MOCK_DATA
        loading.value = false
    }

    return { companions, loading, categories, fetchAll }
}
<template>
    <!-- <header> -->
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container">
                <button style="font-size:24px" @click="toggleSideBar()"><i class="fa fa-bars text-white"></i></button>

                <!-- <a class="navbar-brand" href="">Navbar</a> -->
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <ul class="navbar-nav ms-auto">
                        <li class="nav-item">
                            <button class="nav-link" v-if="userName" @click="logout()">Hi, {{ userName }}
                            </button>
                            <button class="nav-link" @click="login()" v-if="!userName">Login</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        
    <!-- </header> -->
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue';
import { useSidebarStore } from '@/stores/sidebar'
import { useUserStore } from '@/stores/user';

export default defineComponent({
  name: 'Header',
  emits: ['toggleSideBar'],

  setup(props, context) {
    const sidebar = useSidebarStore();
    const user = useUserStore();
    const hidden = ref(false);
    const userName = ref('');

    function toggleSideBar() {
        console.log('toggle sidebar')
        // context.emit('toggleSideBar')
        sidebar.hidden = !sidebar.hidden;
        // sidebar.toggle();
    }
    async function login() {
        const userLoggedIn: any = await user.fakeLogin();
        console.log('login1', userLoggedIn)
        if (userLoggedIn.status === 200 ) {
            console.log('login2', JSON.stringify(user.$state.result.name.first))
            userName.value = `${user.$state.result.name.title} ${user.$state.result.name.first} ${user.$state.result.name.last}`
            
        }
    }
    async function logout() {
        const userLoggedIn: any = await user.logout();
        userName.value = '';
    }

    
    return {
        toggleSideBar,
        login,
        logout,
        user,
        userName,
    };
    },
});

</script>

<style>
</style>

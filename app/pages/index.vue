<script setup lang="ts">
import type { Contributions } from '~~/types'

const colorMode = useColorMode()
const { data: contributions } = await useFetch<Contributions>('/api/contributions')

if (!contributions.value) {
  throw createError('Could not load User activity')
}

const { user, prs } = contributions.value
const userUrl = `https://github.com/${user.username}`

useHead({
  link: [
    { rel: 'icon', href: '/favicon.png' },
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
    { rel: 'alternate', type: 'application/rss+xml', title: `${user.name}'s recent pull requests`, href: '/feed.xml' },
  ],
})
const url = useRequestURL()
useSeoMeta({
  title: `${user.name} is Contributing`,
  description: `Discover ${user.name} recent pull requests on GitHub.`,
  ogTitle: `${user.name} is Contributing`,
  ogDescription: `Discover ${user.name} recent pull requests on GitHub.`,
  twitterCard: 'summary_large_image',
  ogImage: `${url.origin}/og.png`,
  twitterImage: `${url.origin}/og.png`,
})

let toggleThemeMode = (event: MouseEvent) => {
  if (!document.startViewTransition) {
    toggleThemeMode = () => {
      colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
    }
  } else {
    const x = event.clientX;
    const y = event.clientY;
    const endRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    );
    const transition = document.startViewTransition(() => {
      colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
    });
  
    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ];
      document.documentElement.animate(
        {
          clipPath: colorMode.value === 'dark' ? clipPath : clipPath.reverse(),
        },
        {
          duration: 300,
          easing: "ease-in",
          pseudoElement: colorMode.value === 'dark' ? "::view-transition-new(root)" : "::view-transition-old(root)",
        }
      );
    });
  }
}
</script>

<template>
  <UContainer class="p-4 sm:p-6 lg:p-8 lg:pt-10 max-w-3xl">
    <div class="flex flex-col items-center gap-2">
      <a :href="userUrl" target="_blank"><UAvatar
        :src="user.avatar"
        :alt="user.name"
        size="xl"
      />
      </a>
      <h1 class="text-2xl sm:text-3xl text-center">
        <a :href="userUrl" target="_blank">
          {{ user.name }}
        </a>
        is <span class="animate-pulse">Contributing...</span>
      </h1>
      <p class="text-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
        <NuxtLink :to="userUrl" target="_blank">
          @{{ user.username }}'s recent pull requests on GitHub.
        </NuxtLink>
      </p>
      <div class="flex items-center justify-center gap-1 text-gray-700 dark:text-gray-300">
        <ClientOnly>
          <UButton
            :aria-label="`${user.name}'s GitHub profile`"
            :icon="colorMode.value === 'dark' ? 'i-ph-moon-stars-duotone' : 'i-ph-sun-duotone'"
            color="gray"
            variant="link"
            @click="toggleThemeMode($event)"
          />
          <template #fallback>
            <div class="w-8 h-8" />
          </template>
        </ClientOnly>
        <UButton
          :to="userUrl"
          external
          target="_blank"
          :aria-label="`${user.name}'s GitHub profile`"
          icon="i-ph-github-logo-duotone"
          color="gray"
          variant="link"
        />
        <UButton
          to="/feed.xml"
          external
          target="_blank"
          aria-label="RSS Feed"
          icon="i-ph-rss-simple-duotone"
          color="gray"
          variant="link"
        />
      </div>
      <UDivider class="mt-2 sm:mt-6 mb-6 sm:mb-10 w-1/2 mx-auto animate-pulse" />
    </div>

    <div class="flex flex-col gap-6 sm:gap-10">
      <PullRequest v-for="pr of prs" :key="pr.url" :data="pr" />
    </div>
  </UContainer>
</template>

<style>
@layer view-transitions {
  @layer no-root {
    ::view-transition-old(root),
    ::view-transition-new(root) {
      animation: none;
      mix-blend-mode: normal
    }
  }

  @layer light {
    html.light::view-transition-old(root) {
      z-index: 999
    }

    html.light::view-transition-new(root) {
      z-index: 1
    }
  }

  @layer dark {
    html.dark::view-transition-old(root) {
      z-index: 1
    }

    html.dark::view-transition-new(root) {
      z-index: 999
    }
  }
}
</style>
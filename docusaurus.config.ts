import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'AI-Native Learning',
  tagline: 'Personalized AI-powered educational content',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://your-domain.vercel.app',
  // Set the /<baseUrl>/ pathname under which your site is served
  baseUrl: '/',

  // GitHub pages deployment config.
  organizationName: 'your-org',
  projectName: 'ai-native-book',

  onBrokenLinks: 'throw',

  // Internationalization
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Each doc can include frontmatter to configure tabs:
          // ---
          // lessonId: uuid-from-database
          // enableTabs: true (default) or false
          // ---
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    function (context, options) {
      return {
        name: 'docusaurus-proxy-plugin',
        configureWebpack(config, isServer, utils) {
          if (isServer) {
            return {};
          }
          return {
            devServer: {
              proxy: [
                {
                  context: ['/api'],
                  target: 'http://localhost:3001',
                  changeOrigin: true,
                  cookieDomainRewrite: 'localhost',
                  onProxyRes: function(proxyRes, req, res) {
                    // Ensure cookies are forwarded properly
                    const cookies = proxyRes.headers['set-cookie'];
                    if (cookies) {
                      proxyRes.headers['set-cookie'] = cookies.map(cookie =>
                        cookie.replace(/Domain=[^;]+;?/gi, '')
                      );
                    }
                  },
                },
              ],
            },
          };
        },
      };
    },
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'AI-Native Learning',
      logo: {
        alt: 'AI-Native Learning Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Tutorials',
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/your-org/ai-native-book',
          label: 'GitHub',
          position: 'right',
        },
        // Auth button is added via theme customization (NavbarAuthButton component)
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Learn',
          items: [
            {
              label: 'Tutorials',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Discord',
              href: 'https://discord.gg/your-community',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/your-handle',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/your-org/ai-native-book',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} AI-Native Learning. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'typescript', 'json'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;

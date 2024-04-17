// const localePrefix: LocalePrefix = 'as-needed';

// Update this configuration file based on your project information
export const LocaleConfig = {
  locales: [
    {
      id: "en",
      name: "English",
    },
    { id: "zh-CN", name: "中文" },
  ],
  defaultLocale: "en",
  //   localePrefix,
};

export const AllLocales = LocaleConfig.locales.map((locale) => locale.id);

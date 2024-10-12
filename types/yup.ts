import * as Yup from 'yup';

const jikanImagesCollectionSchema = Yup.object().shape({
  image_url: Yup.string().url().nullable().optional(),
  small_image_url: Yup.string().url().nullable().optional(),
  medium_image_url: Yup.string().url().nullable().optional(),
  large_image_url: Yup.string().url().nullable().optional(),
  maximum_image_url: Yup.string().url().nullable().optional(),
});

const jikanImagesSchema = Yup.object().shape({
  jpg: jikanImagesCollectionSchema.required(),
  webp: jikanImagesCollectionSchema.nullable().optional(),
});

const jikanResourceSchema = Yup.object().shape({
  mal_id: Yup.number().required(),
  type: Yup.string().required(),
  name: Yup.string().required(),
  url: Yup.string().url().required(),
});

export const animeSchema = Yup.object().shape({
  mal_id: Yup.number().required(),
  url: Yup.string().url().required(),
  images: jikanImagesSchema.required(),
  trailer: Yup.object().shape({
    youtube_id: Yup.string().nullable().optional(),
    url: Yup.string().url().nullable().optional(),
    embed_url: Yup.string().url().nullable().optional(),
    images: jikanImagesCollectionSchema.nullable().optional(),
  }).nullable().optional(),
  approved: Yup.boolean().required(),
  titles: Yup.array().of(
    Yup.object().shape({
      type: Yup.string().required(),
      title: Yup.string().required(),
    })
  ).required(),
  title: Yup.string().required(),
  title_english: Yup.string().nullable().optional(),
  title_japanese: Yup.string().required(),
  title_synonyms: Yup.array().of(Yup.string()).required(),
  type: Yup.string()
    .lowercase()
    .oneOf(['tv', 'movie', 'ova', 'special', 'ona', 'music'])
    .nullable()
    .required(),
  source: Yup.string().nullable().required(),
  episodes: Yup.number().nullable().required(),
  status: Yup.string()
    .oneOf(['Finished Airing', 'Currently Airing', 'Complete', 'Not yet aired'])
    .nullable()
    .required(),
  airing: Yup.boolean().required(),
  aired: Yup.object().shape({
    from: Yup.string().nullable().optional(),
    to: Yup.string().nullable().optional(),
    prop: Yup.object().shape({
      from: Yup.object().shape({
        day: Yup.number().nullable().optional(),
        month: Yup.number().nullable().optional(),
        year: Yup.number().nullable().optional(),
      }).required(),
      to: Yup.object().shape({
        day: Yup.number().nullable().optional(),
        month: Yup.number().nullable().optional(),
        year: Yup.number().nullable().optional(),
      }).optional(),
      string: Yup.string().nullable().optional(),
    }).required(),
  }).required(),
  duration: Yup.string().nullable().required(),
  rating: Yup.string().nullable().optional(),
  score: Yup.number().nullable().optional(),
  scored_by: Yup.number().nullable().optional(),
  rank: Yup.number().nullable().required(),
  popularity: Yup.number().nullable().required(),
  members: Yup.number().nullable().required(),
  favorites: Yup.number().nullable().required(),
  synopsis: Yup.string().nullable().optional(),
  background: Yup.string().nullable().optional(),
  season: Yup.string()
    .oneOf(['spring', 'summer', 'fall', 'winter'])
    .nullable()
    .optional(),
  year: Yup.number().nullable().optional(),
  broadcast: Yup.object().shape({
    day: Yup.string().nullable().optional(),
    time: Yup.string().nullable().optional(),
    timezone: Yup.string().nullable().optional(),
    string: Yup.string().nullable().optional(),
  }).nullable().optional(),
  producers: Yup.array().of(jikanResourceSchema).nullable().optional(),
  licensors: Yup.array().of(jikanResourceSchema).nullable().optional(),
  studios: Yup.array().of(jikanResourceSchema).nullable().optional(),
  genres: Yup.array().of(jikanResourceSchema).nullable().optional(),
  explicit_genres: Yup.array().of(jikanResourceSchema).nullable().optional(),
  themes: Yup.array().of(jikanResourceSchema).nullable().optional(),
  demographics: Yup.array().of(jikanResourceSchema).nullable().optional(),
  relations: Yup.array().of(
    Yup.object().shape({
      relation: Yup.string().required(),
      entry: Yup.array().of(jikanResourceSchema).required(),
    })
  ).nullable().optional(),
  theme: Yup.object().shape({
    openings: Yup.array().of(Yup.string()).nullable().optional(),
    endings: Yup.array().of(Yup.string()).nullable().optional(),
  }).nullable().optional(),
  external: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().required(),
        url: Yup.string().url().required(),
      })
    )
    .nullable()
    .optional(),
  streaming: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().required(),
        url: Yup.string().url().required(),
      })
    )
    .nullable()
    .optional(),
});

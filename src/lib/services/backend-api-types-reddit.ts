export type Listing = {
  kind: string;
  data: {
    after: string;
    dist: number;
    modhash: string;
    geo_filter: null;
    children: Array<{ kind: string; data: Entry }>;
    before: null;
  };
};

export type Entry = {
  approved_at_utc: null;
  subreddit: string;
  selftext: string;
  author_fullname: string;
  saved: boolean;
  mod_reason_title: null;
  gilded: number;
  clicked: boolean;
  title: string;
  link_flair_richtext: any[];
  subreddit_name_prefixed: string;
  hidden: boolean;
  pwls: number;
  link_flair_css_class: null;
  downs: number;
  thumbnail_height: number | null;
  top_awarded_type: null;
  hide_score: boolean;
  name: string;
  quarantine: boolean;
  link_flair_text_color: string;
  upvote_ratio: number;
  author_flair_background_color: null | string;
  subreddit_type: string;
  ups: number;
  total_awards_received: number;
  media_embed: MediaEmbed;
  thumbnail_width: number | null;
  author_flair_template_id: null;
  is_original_content: boolean;
  user_reports: any[];
  secure_media: Media | null;
  is_reddit_media_domain: boolean;
  is_meta: boolean;
  category: null;
  secure_media_embed: MediaEmbed;
  link_flair_text: null;
  can_mod_post: boolean;
  score: number;
  approved_by: null;
  is_created_from_ads_ui: boolean;
  author_premium: boolean;
  thumbnail: string;
  edited: boolean;
  author_flair_css_class: null | string;
  author_flair_richtext: any[];
  gildings: DataGildings;
  post_hint?: string;
  content_categories: null;
  is_self: boolean;
  mod_note: null;
  created: number;
  link_flair_type: string;
  wls: number;
  removed_by_category: null;
  banned_by: null;
  author_flair_type: string;
  domain: string;
  allow_live_comments: boolean;
  selftext_html: null | string;
  likes: null;
  suggested_sort: null;
  banned_at_utc: null;
  view_count: null;
  archived: boolean;
  no_follow: boolean;
  is_crosspostable: boolean;
  pinned: boolean;
  over_18: boolean;
  preview?: DataPreview;
  all_awardings: AllAwarding[];
  awarders: any[];
  media_only: boolean;
  can_gild: boolean;
  spoiler: boolean;
  locked: boolean;
  author_flair_text: null | string;
  treatment_tags: any[];
  visited: boolean;
  removed_by: null;
  num_reports: null;
  distinguished: null | string;
  subreddit_id: string;
  author_is_blocked: boolean;
  mod_reason_by: null;
  removal_reason: null;
  link_flair_background_color: string;
  id: string;
  is_robot_indexable: boolean;
  report_reasons: null;
  author: string;
  discussion_type: null;
  num_comments: number;
  send_replies: boolean;
  whitelist_status: string;
  contest_mode: boolean;
  mod_reports: any[];
  author_patreon_flair: boolean;
  author_flair_text_color: null | string;
  permalink: string;
  parent_whitelist_status: string;
  stickied: boolean;
  url: string;
  subreddit_subscribers: number;
  created_utc: number;
  num_crossposts: number;
  media: Media | null;
  is_video: boolean;
  url_overridden_by_dest?: string;
  is_gallery?: boolean;
  media_metadata?: { [key: string]: MediaMetadatum };
  gallery_data?: GalleryData;
  crosspost_parent_list?: CrosspostParentList[];
  crosspost_parent?: string;
};

type AllAwarding = {
  giver_coin_reward: null;
  subreddit_id: null;
  is_new: boolean;
  days_of_drip_extension: null;
  coin_price: number;
  id: string;
  penny_donate: null;
  award_sub_type: string;
  coin_reward: number;
  icon_url: string;
  days_of_premium: number | null;
  tiers_by_required_awardings: {
    [key: string]: TiersByRequiredAwarding;
  } | null;
  resized_icons: ResizedIcon[];
  icon_width: number;
  static_icon_width: number;
  start_date: null;
  is_enabled: boolean;
  awardings_required_to_grant_benefits: number | null;
  description: string;
  end_date: null;
  sticky_duration_seconds: null;
  subreddit_coin_reward: number;
  count: number;
  static_icon_height: number;
  name: string;
  resized_static_icons: ResizedIcon[];
  icon_format: null | string;
  icon_height: number;
  penny_price: number | null;
  award_type: string;
  static_icon_url: string;
};

type ResizedIcon = {
  url: string;
  width: number;
  height: number;
  format?: null | string;
};

type TiersByRequiredAwarding = {
  resized_icons: ResizedIcon[];
  awardings_required: number;
  static_icon: ResizedIcon;
  resized_static_icons: ResizedIcon[];
  icon: ResizedIcon;
};

type CrosspostParentList = {
  approved_at_utc: null;
  subreddit: string;
  selftext: string;
  author_fullname: string;
  saved: boolean;
  mod_reason_title: null;
  gilded: number;
  clicked: boolean;
  title: string;
  link_flair_richtext: any[];
  subreddit_name_prefixed: string;
  hidden: boolean;
  pwls: number;
  link_flair_css_class: null;
  downs: number;
  thumbnail_height: number;
  top_awarded_type: null;
  hide_score: boolean;
  name: string;
  quarantine: boolean;
  link_flair_text_color: string;
  upvote_ratio: number;
  author_flair_background_color: null;
  subreddit_type: string;
  ups: number;
  total_awards_received: number;
  media_embed: MediaEmbedClass;
  thumbnail_width: number;
  author_flair_template_id: null;
  is_original_content: boolean;
  user_reports: any[];
  secure_media: null;
  is_reddit_media_domain: boolean;
  is_meta: boolean;
  category: null;
  secure_media_embed: MediaEmbedClass;
  link_flair_text: null;
  can_mod_post: boolean;
  score: number;
  approved_by: null;
  is_created_from_ads_ui: boolean;
  author_premium: boolean;
  thumbnail: string;
  edited: boolean;
  author_flair_css_class: null;
  author_flair_richtext: any[];
  gildings: MediaEmbedClass;
  post_hint: string;
  content_categories: null;
  is_self: boolean;
  mod_note: null;
  created: number;
  link_flair_type: string;
  wls: number;
  removed_by_category: null;
  banned_by: null;
  author_flair_type: string;
  domain: string;
  allow_live_comments: boolean;
  selftext_html: null;
  likes: null;
  suggested_sort: null;
  banned_at_utc: null;
  url_overridden_by_dest: string;
  view_count: null;
  archived: boolean;
  no_follow: boolean;
  is_crosspostable: boolean;
  pinned: boolean;
  over_18: boolean;
  preview: CrosspostParentListPreview;
  all_awardings: any[];
  awarders: any[];
  media_only: boolean;
  can_gild: boolean;
  spoiler: boolean;
  locked: boolean;
  author_flair_text: null;
  treatment_tags: any[];
  visited: boolean;
  removed_by: null;
  num_reports: null;
  distinguished: null;
  subreddit_id: string;
  author_is_blocked: boolean;
  mod_reason_by: null;
  removal_reason: null;
  link_flair_background_color: string;
  id: string;
  is_robot_indexable: boolean;
  report_reasons: null;
  author: string;
  discussion_type: null;
  num_comments: number;
  send_replies: boolean;
  whitelist_status: string;
  contest_mode: boolean;
  mod_reports: any[];
  author_patreon_flair: boolean;
  author_flair_text_color: null;
  permalink: string;
  parent_whitelist_status: string;
  stickied: boolean;
  url: string;
  subreddit_subscribers: number;
  created_utc: number;
  num_crossposts: number;
  media: null;
  is_video: boolean;
};

type MediaEmbedClass = any;

type CrosspostParentListPreview = {
  images: PurpleImage[];
  enabled: boolean;
};

type PurpleImage = {
  source: ResizedIcon;
  resolutions: ResizedIcon[];
  variants: MediaEmbedClass;
  id: string;
};

type GalleryData = {
  items: Item[];
};

type Item = {
  media_id: string;
  id: number;
};

type DataGildings = {
  gid_1?: number;
  gid_2?: number;
};

type Media = {
  reddit_video?: RedditVideo;
  type?: string;
  oembed?: Oembed;
};
type RedditVideo = {
  fallback_url: string;
  height: number;
  width: number;
  scrubber_media_url: string;
  dash_url: string;
  duration: number;
  hls_url: string;
  is_gif: boolean;
  transcoding_status: string;
};

type Oembed = {
  provider_url: string;
  description: string;
  title: string;
  author_name: string;
  height: number;
  width: number;
  html: string;
  thumbnail_width: number;
  version: string;
  provider_name: string;
  thumbnail_url: string;
  type: string;
  thumbnail_height: number;
};

type MediaEmbed = {
  content?: string;
  width?: number;
  scrolling?: boolean;
  height?: number;
  media_domain_url?: string;
};

type MediaMetadatum = {
  status: string;
  e: string;
  m: string;
  p: S[];
  s: S;
  id: string;
};

type S = {
  y: number;
  x: number;
  u: string;
};

type DataPreview = {
  images: FluffyImage[];
  enabled: boolean;
  reddit_video_preview?: RedditVideoPreview;
};

type FluffyImage = {
  source: ResizedIcon;
  resolutions: ResizedIcon[];
  variants: Variants;
  id: string;
};

type Variants = {
  gif?: GIF;
  mp4?: GIF;
};

type GIF = {
  source: ResizedIcon;
  resolutions: ResizedIcon[];
};

type RedditVideoPreview = {
  bitrate_kbps: number;
  fallback_url: string;
  height: number;
  width: number;
  scrubber_media_url: string;
  dash_url: string;
  duration: number;
  hls_url: string;
  is_gif: boolean;
  transcoding_status: string;
};

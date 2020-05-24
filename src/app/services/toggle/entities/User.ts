import {Workspace} from "../Workspace";

export interface User {
  id: string;
  api_token: string;
  default_wid: string;
  email: string;
  fullname: string;
  jquery_timeofday_format: string;
  jquery_date_format: string;
  timeofday_format: string;
  date_format: string;
  store_start_and_stop_time: boolean;
  beginning_of_week: number;
  language: string;
  image_url: string;
  sidebar_piechart: boolean;
  at: string;
  created_at: string;
  retention: number;
  record_timeline: boolean;
  render_timeline: boolean;
  timeline_enabled: boolean;
  timeline_experiment: boolean;
  new_blog_post: object;
  should_upgrade: boolean;
  achievements_enabled: boolean;
  timezone: string;
  openid_enabled: boolean;
  openid_email: string;
  send_product_emails: boolean;
  send_weekly_report: boolean;
  send_timer_notifications: boolean;
  last_blog_entry: string;
  invitation: object;
  workspaces: Workspace[];
  duration_format: string;
}

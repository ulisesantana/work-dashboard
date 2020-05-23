export interface ReportRequest {
    /** Required. The name of your application or your email address so we can get in touch in case you're doing something wrong. */
    user_agent: string
    /** Required. The workspace whose data you want to access. */
    workspace_id: string
    /** ISO 8601 date (YYYY-MM-DD) format. Defaults to today - 6 days. */
    since?: string
    /** ISO 8601 date (YYYY-MM-DD) format. Maximum date span (until - since) is one year. Defaults to today, unless since is in future or more than year ago, in this case until is since + 6 days. */
    until?: string 
    /** "yes", "no", or "both". Defaults to "both". */
    billable?: "yes" | "no" | "both"
    /** A list of client IDs separated by a comma. Use "0" if you want to filter out time entries without a client. */
    client_ids?: string
    /** A list of project IDs separated by a comma. Use "0" if you want to filter out time entries without a project. */
    project_ids?: string
    /** A list of user IDs separated by a comma. */
    user_ids?: string
    /** A list of group IDs separated by a comma. This limits provided user_ids to the members of the given groups. */
    members_of_group_ids?: string 
    /** A list of group IDs separated by a comma. This extends provided user_ids with the members of the given groups. */
    or_members_of_group_ids?: string
    /** A list of tag IDs separated by a comma. Use "0" if you want to filter out time entries without a tag. */
    tag_ids?: string
    /** A list of task IDs separated by a comma. Use "0" if you want to filter out time entries without a task. */
    task_ids?: string
    /** A list of time entry IDs separated by a comma. */
    time_entry_ids?: string
    /** Matches against time entry descriptions. */
    description?: string
    /** "true" or "false". Filters out the time entries which do not have a description (literally "(no description)"). */
    without_description?: "true" | "false"
    /** 
     For detailed reports: 
        "date", "description", "duration", or "user"  
     For summary reports: 
        "title", "duration", or "amount"
     For weekly reports: 
        "title", "day1", "day2", "day3", "day4", "day5", "day6", "day7", or "week_total"
     */
    order_desc?: "date" | "description" | "duration" | "user" | "title" | "duration" | "amount" | "day1" | "day2" | "day3" | "day4" | "day5" | "day6" | "day7" | "week_total"
    /** "on" for descending, or "off" for ascending order. */
    order_field?: "on" | "off"
    /** "on" or "off". Defaults to "off". */
    distinct_rates?: "on" | "off"
    /** "on" or "off". Defaults to "off". Rounds time according to workspace settings. */
    rounding?: "on" | "off"
    /** "decimal" or "minutes". Defaults to "minutes". Determines whether to display hours as a decimal number or with minutes. */
    display_hours?: "decimal" | "minutes"

}
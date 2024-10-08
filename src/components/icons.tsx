import {
  type LucideProps,
  Loader2,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  User,
  AlertTriangle,
  PackageOpen,
  Settings,
  Plus,
  Home,
  Users,
  LineChart,
  Check,
  LogOut,
  X,
  Calendar,
  CalendarCheck,
  TimerOff,
  Timer,
  CalendarCheck2,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Image,
  Edit,
  Globe,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";

export const IconsVariants = cva("w-4 h-4 shrink-0");
export type IconProps = {} & LucideProps & VariantProps<typeof IconsVariants>;
export type Icon = keyof typeof Icons;

export const Icons = {
  logo: ({ className, ...props }: IconProps) => (
    <img
      src="/icon.png"
      alt=""
      className={cn(IconsVariants({}), "mr-2 h-6 w-6", className)}
      // {...props}
    />
  ),

  fullLogo: ({ className, ...props }: IconProps) => (
    <img
      src="/logo.png"
      alt=""
      className={cn(IconsVariants({}), "mr-2 h-6 w-6", className)}
      // {...props}
    />
  ),
  spinner: ({ className, ...props }: IconProps) => (
    <Loader2
      className={cn(IconsVariants({}), "animate-spin", className)}
      {...props}
    />
  ),
  home: ({ className, ...props }: IconProps) => (
    <Home className={cn(IconsVariants({}), className)} {...props} />
  ),
  schedule: ({ className, ...props }: IconProps) => (
    <CalendarCheck2 className={cn(IconsVariants({}), className)} {...props} />
  ),
  scheduleCheck: ({ className, ...props }: IconProps) => (
    <CalendarCheck className={cn(IconsVariants({}), className)} {...props} />
  ),
  timer: ({ className, ...props }: IconProps) => (
    <Timer className={cn(IconsVariants({}), className)} {...props} />
  ),
  globe: ({ className, ...props }: IconProps) => (
    <Globe className={cn(IconsVariants({}), className)} {...props} />
  ),
  timerOff: ({ className, ...props }: IconProps) => (
    <TimerOff className={cn(IconsVariants({}), className)} {...props} />
  ),
  calender: ({ className, ...props }: IconProps) => (
    <Calendar className={cn(IconsVariants({}), className)} {...props} />
  ),
  image: ({ className, ...props }: IconProps) => (
    <Image className={cn(IconsVariants({}), className)} {...props} />
  ),
  edit: ({ className, ...props }: IconProps) => (
    <Edit className={cn(IconsVariants({}), className)} {...props} />
  ),
  x: ({ className, ...props }: IconProps) => (
    <X className={cn(IconsVariants({}), className)} {...props} />
  ),
  check: ({ className, ...props }: IconProps) => (
    <Check className={cn(IconsVariants({}), className)} {...props} />
  ),
  logout: ({ className, ...props }: IconProps) => (
    <LogOut className={cn(IconsVariants({}), className)} {...props} />
  ),
  analytics: ({ className, ...props }: IconProps) => (
    <LineChart className={cn(IconsVariants({}), className)} {...props} />
  ),
  settings: ({ className, ...props }: IconProps) => (
    <Settings className={cn(IconsVariants({}), className)} {...props} />
  ),
  add: ({ className, ...props }: IconProps) => (
    <Plus className={cn(IconsVariants({}), className)} {...props} />
  ),
  externalLink: ({ className, ...props }: IconProps) => (
    <ExternalLink className={cn(IconsVariants({}), className)} {...props} />
  ),
  warning: ({ className, ...props }: IconProps) => (
    <AlertTriangle className={cn(IconsVariants({}), className)} {...props} />
  ),
  empty: ({ className, ...props }: IconProps) => (
    <PackageOpen className={cn(IconsVariants({}), className)} {...props} />
  ),
  user: ({ className, ...props }: IconProps) => (
    <User className={cn(IconsVariants({}), className)} {...props} />
  ),
  users: ({ className, ...props }: IconProps) => (
    <Users className={cn(IconsVariants({}), className)} {...props} />
  ),
  chevronLeft: ({ className, ...props }: IconProps) => (
    <ChevronLeft className={cn(IconsVariants({}), className)} {...props} />
  ),
  chevronRight: ({ className, ...props }: IconProps) => (
    <ChevronRight className={cn(IconsVariants({}), className)} {...props} />
  ),
  // SocialMedia Icons, keys must be lowercase -- used as lowercase another place in code
  facebook: ({ className, ...props }: IconProps) => (
    <Facebook
      className={cn(
        IconsVariants({}),
        "rounded-full bg-blue-600 p-0.5 text-primary-foreground",
        className,
      )}
      {...props}
    />
  ),
  instagram: ({ className, ...props }: IconProps) => (
    <Instagram
      className={cn(IconsVariants({}), "stroke-pink-700", className)}
      {...props}
    />
  ),
  linkedin: ({ className, ...props }: IconProps) => (
    <Linkedin
      className={cn(IconsVariants({}), "stroke-blue-600", className)}
      {...props}
    />
  ),
  twitter: ({ className, ...props }: IconProps) => (
    <Twitter
      className={cn(IconsVariants({}), "stroke-blue-600", className)}
      {...props}
    />
  ),
  google: ({ className, ...props }: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      width="16px"
      height="16px"
      className={cn(IconsVariants({}), className)}
      {...props}
    >
      <path
        fill="#fbc02d"
        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
      />
      <path
        fill="#e53935"
        d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
      />
      <path
        fill="#4caf50"
        d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
      />
      <path
        fill="#1565c0"
        d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
      />
    </svg>
  ),
};

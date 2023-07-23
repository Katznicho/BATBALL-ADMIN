
export const BASE_URL:string = "https://dev.vxpts.com/api/v1"
export const REGISTER:string = '/client/auth/register';
export const LOGIN:string = '/client/auth/login';
export const LOGOUT:string = '/client/auth/logout';
export const FORGOT_PASSWORD:string = '/client/auth/forgot-password';
export const RESET_PASSWORD:string = '/client/auth/reset-password';
export const VERIFY_EMAIL:string = '/client/auth/verifyEmail';
export const RESEND_EMAIL:string = '/client/auth/resentOTP';
export const GET_USER:string = '/client/auth/get-user';
export const UPDATE_USER:string = '/client/auth/update-user';
export const UPDATE_PASSWORD:string = '/client/auth/update-password';
export const LOGOUT_USER:string = '/client/auth/logout';
export const CREATE_USER_PROFILE:string ="/client/auth/createUserProfile"


//PACKAGE ENDPOINTS
export const GET_ALL_PACKAGES:string = "/client/packages";


//TRAINER ENDPOINTS
export const GET_ALL_TRAINERS:string  = "/trainer/list";
export const GET_TRAINER_AVAILABILITY:string  = "/trainer/availability";
export const GET_TRAINER_TIME_SLOTS:string  = "/trainer/availability/getTrainerTimeSlots"
export const GET_CHANGEABLE_TRAINERS:string = "/client/booking/getChangeableTrainers"
//TRAINER RATINGS
export const RATE_TRAINER:string = "/trainer/rating"
export const GET_TRAINER_RATINGS:string = "/trainer/rating"


//WORKOUT CATEGORIES
export const GET_WORKOUT_CATEROGIES:string = "/client/workouts";

//firebase collections
export const USER_COLLECTION:string = "users";
export const USER_STATUS:string = "statuses";
export const USER_POSTS:string = "posts";
export const CLUBS:string = "clubs";
export const CLUB_MEMBERS:string = "club-members";
export const CLUB_PLAYERS:string = "club_players";
export const PLAYERS: string = "players";
export const SEASONS: string = "seasons";
export const SEASON_TABLE: string = "season_table";
export const SEASON_FIXTURES: string = "season_fixtures";
export const VIDEOS = "videos";
export const EXCEPTIONAL_PLAYS = "exceptional_plays";
export const GALLERIES = "galleries";

//firebase storage
export const PROFILE_STORAGE:string  = "profile/images"

//update avatar
export const UPDATE_AVATAR:string = "/client/auth/updateAvatar"

//payments
export const  CLIENT_MAKE_PAYMENT:string = "/client/booking/makePayment"
export const CLIENT_BOOK_REMAINING_SLOTS = "/client/booking/bookTraining"

export const CLIENT_CURRENT_SESSIONS:string = "/client/booking/training-sessions";

// client/booking/sessions

//payment cards
export const GET_CLIENT_PAYMENT_CARDS:string = "/client/payment-cards";
export const  ADD_PAYMENT_CARD:string ="/client/payment-cards"
export const UPDATE_PAYMENT_CARD:string ="/client/payment-cards/updatePaymentCard"
export const DELETE_PAYMENT_CARD:string = "/client/payment-cards/deletePaymentCard"



//BOOKINGS
export const GET_CLIENT_BOOKINGS:string = "/client/booking/getUserBookings"


//trainer ratings
export const TRAINER_RATINGS:string = "/trainer/rating"

//trainer stats
export const TRAINER_STATS:string = "/trainer/workouts/getTrainerStats"




export const DEFAULT_USER_PROFILE =  "https://media.istockphoto.com/id/519078727/photo/male-silhouette-as-avatar-profile-picture.jpg?b=1&s=170667a&w=0&k=20&c=JzPsyMEFcdQp2UlFqLVeuOaj2bOpteXUWFR9FJzTnBM=";
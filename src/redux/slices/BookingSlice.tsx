import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface PackageDetails {
    packageId?: string;
    packagePrice?: number;
    packageDuration?: number;
    packageNoOfSessions?: number;
    packageName?: string;
}

export interface TrainerDetails {
    trainerId?: string;
    trainerName?: string;
    trainerImage?: string;
    trainerRating?: number|null;
    street?: string;
     city?:string

}

export interface Details {
    date: any;
    year: number | null;
    month: number | null;
    day: number | null;
    gym_id: number | null;
    start_time:any;
    end_time: any;
    gym_name?: string |null;
  }

export interface BookingState {
    userbooking: {
        workOutCategoryId?: string | null;
        packageDetails?: PackageDetails| null;
        trainerDetails?:TrainerDetails | null;
        gymId?: string[];
        timeRange?: string[];
        days?: string[];
        details?:Details[]|[],
        isPaid?:boolean
        workout_id?:string
    } | null;

}



const initialState: BookingState = {
    userbooking: null,
};

export const bookingSlice = createSlice({
    name: 'bookingSlice',
    initialState,

    reducers: {
        //packageDetails
        setPackageDetails: (state, action: PayloadAction<PackageDetails>) => {
            state.userbooking = {
                ...state.userbooking,
                packageDetails: action.payload,
                isPaid:false
            };
        },
        //workOutCategoryId
        setWorkOutCategoryId: (state, action: PayloadAction<string>) => {

            state.userbooking = {
                ...state.userbooking,
                workOutCategoryId: action.payload,
            };

        },
        //trainerId
        setTrainerDetails: (state, action: PayloadAction<TrainerDetails>) => {

            state.userbooking = {
                ...state.userbooking,
                trainerDetails: action.payload,
                isPaid:false
            };

        },
        //gymId
        setGymId: (state, action: PayloadAction<string[]>) => {

            state.userbooking = {
                ...state.userbooking,
                gymId: action.payload,
                isPaid:false
            };
        },
        //timeRange
        setTimeRange: (state, action: PayloadAction<string[]>) => {

            state.userbooking = {
                ...state.userbooking,
                timeRange: action.payload,
                isPaid:false
            };
        },
        //set booking details
        setBookingDetails:(state, action: PayloadAction<any>) => {
            if(state &&state.userbooking){
                state.userbooking.details = action.payload

            }
        },
        //set number of sessions for a package
         setNoOfSessions: (state, action: PayloadAction<number>) => {
            if (state && state.userbooking && state.userbooking.packageDetails) {
                if (state.userbooking.packageDetails.packageNoOfSessions) {
                  state.userbooking.packageDetails.packageNoOfSessions = action.payload;
                  state.userbooking.isPaid = true;
                } else {
                  state.userbooking.packageDetails.packageNoOfSessions = action.payload;
                    state.userbooking.isPaid = true;
                }
              }
        },
        //set work out id
        setWorkOutID:(state, action:PayloadAction<string>)=>{
            state.userbooking = {
                ...state.userbooking,
                workout_id: action.payload,
                isPaid:false
            }
        }



    },
});

// Action creators are generated for each case reducer function
export const {
 setTimeRange,
 setGymId,
 setTrainerDetails,
 setWorkOutCategoryId,
 setPackageDetails,
 setBookingDetails,
 setNoOfSessions,
 setWorkOutID

} = bookingSlice.actions;

export default bookingSlice.reducer;

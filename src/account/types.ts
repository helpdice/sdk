interface PermanentAddressDetails {
    permanent_house?: string;
    permanent_village_town_street?: string;
    permanent_pincode?: string;
    permanent_country?: string;
    permanent_state?: string;
    permanent_city?: string;
}

interface CorrespondenceAddressDetails {
    correspondence_house?: string;
    correspondence_village_town_street?: string;
    correspondence_pincode?: string;
    correspondence_country?: string;
    correspondence_state?: string;
    correspondence_city?: string;
}

interface Profile { 
    name?: string;
    email?: string;
    gender?: string;
    marital_status?: string;
    blood_group?: string;
    avatar?: string;
    father_name?: string;
    mother_name?: string;
    guardian_name?: string;
    username?: string;
    permanent_address?: PermanentAddressDetails;
    correspondence_address?: CorrespondenceAddressDetails;
}

export type { Profile };
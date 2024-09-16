
import { VscPreview, VscCheck, VscPass, VscEye, VscClose } from 'react-icons/vsc';

// Pill Components (Status Badges)
export const PillApproved = () => (
    <div className="flex flex-row items-center p-1 bg-green-500 text-white rounded-md">
        <VscCheck className="mr-2" />
        Approved
    </div>
);

export const PillUnderReview = () => (
    <div className="flex flex-row items-center p-1 bg-orange-500 text-white rounded-md">
        <VscCheck className="mr-2" />
        Under Review
    </div>
);

export const PillPending = () => (
    <div className="flex flex-row items-center p-1 bg-red-500 text-white rounded-md">
        <VscCheck className="mr-2" />
        Pending
    </div>
);
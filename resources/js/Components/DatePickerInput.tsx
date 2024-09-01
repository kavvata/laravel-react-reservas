import { InputHTMLAttributes } from "react";
import DatePicker, { DatePickerProps } from "react-datepicker";

export default function DatePickerInput({
    className = "",
    ...props
}: DatePickerProps) {
    return (
        <DatePicker
            {...props}
            showTimeSelect
            dateFormat="MMMM d, yyyy hh:mmaa"
            className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        />
    );
}

export default function EncryptedIcon({
    className,
    color,
}: {
    className?: string;
    color?: string;
}) {
    return (
        <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <mask
                id="mask0_104_153"
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="28"
                height="28"
            >
                <rect width="28" height="28" fill={"#FFFFFF"} />
            </mask>
            <g mask="url(#mask0_104_153)">
                <path
                    d="M12.95 17.5H15.05C15.225 17.5 15.3757 17.4271 15.5021 17.2812C15.6285 17.1354 15.6722 16.975 15.6334 16.8L15.0792 13.7375C15.4681 13.5431 15.7743 13.2611 15.9979 12.8917C16.2215 12.5222 16.3334 12.1139 16.3334 11.6667C16.3334 11.025 16.1049 10.4757 15.6479 10.0187C15.191 9.5618 14.6417 9.33333 14 9.33333C13.3584 9.33333 12.809 9.5618 12.3521 10.0187C11.8952 10.4757 11.6667 11.025 11.6667 11.6667C11.6667 12.1139 11.7785 12.5222 12.0021 12.8917C12.2257 13.2611 12.532 13.5431 12.9209 13.7375L12.3667 16.8C12.3278 16.975 12.3715 17.1354 12.4979 17.2812C12.6243 17.4271 12.775 17.5 12.95 17.5ZM14 25.55C13.8639 25.55 13.7375 25.5403 13.6209 25.5208C13.5042 25.5014 13.3875 25.4722 13.2709 25.4333C10.6459 24.5583 8.55558 22.9396 7.00002 20.5771C5.44446 18.2146 4.66669 15.6722 4.66669 12.95V7.4375C4.66669 6.95139 4.80766 6.51389 5.0896 6.125C5.37155 5.73611 5.73613 5.45416 6.18335 5.27916L13.1834 2.65416C13.4556 2.55694 13.7278 2.50833 14 2.50833C14.2722 2.50833 14.5445 2.55694 14.8167 2.65416L21.8167 5.27916C22.2639 5.45416 22.6285 5.73611 22.9104 6.125C23.1924 6.51389 23.3334 6.95139 23.3334 7.4375V12.95C23.3334 15.6722 22.5556 18.2146 21 20.5771C19.4445 22.9396 17.3542 24.5583 14.7292 25.4333C14.6125 25.4722 14.4959 25.5014 14.3792 25.5208C14.2625 25.5403 14.1361 25.55 14 25.55ZM14 23.2167C16.0222 22.575 17.6945 21.2917 19.0167 19.3667C20.3389 17.4417 21 15.3028 21 12.95V7.4375L14 4.8125L7.00002 7.4375V12.95C7.00002 15.3028 7.66113 17.4417 8.98335 19.3667C10.3056 21.2917 11.9778 22.575 14 23.2167Z"
                    fill={color || "currentColor"}
                />
            </g>
        </svg>
    );
}

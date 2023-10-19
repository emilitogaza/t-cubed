type IconProps = {
  className: string;
};

function ResetIcon({ className }: IconProps): React.ReactElement {
  return (
    <svg
      className={className}
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.4212 19.7961C8.83268 19.441 7.53204 18.6362 6.51923 17.3817C5.50641 16.1272 5 14.6666 5 12.9999C5 12.1525 5.15513 11.3381 5.46538 10.5567C5.77564 9.77527 6.20321 9.05829 6.74808 8.40573C6.84166 8.29546 6.95127 8.23937 7.07692 8.23745C7.20256 8.23552 7.32242 8.29161 7.43652 8.40573C7.53013 8.49931 7.57788 8.61212 7.5798 8.74417C7.58173 8.87622 7.5359 9.00122 7.4423 9.11917C6.96538 9.64867 6.60577 10.2474 6.36345 10.9153C6.12115 11.5833 6 12.2781 6 12.9999C6 14.4012 6.43429 15.6439 7.30287 16.7278C8.17147 17.8118 9.27564 18.5134 10.6154 18.8326C10.7295 18.8608 10.8221 18.9217 10.8933 19.0153C10.9644 19.1089 11 19.2128 11 19.3269C11 19.4935 10.9442 19.6246 10.8327 19.7201C10.7212 19.8157 10.584 19.841 10.4212 19.7961ZM13.5788 19.8346C13.416 19.8794 13.2789 19.8532 13.1673 19.7557C13.0558 19.6583 13 19.5262 13 19.3596C13 19.2493 13.0356 19.1474 13.1067 19.0538C13.1779 18.9602 13.2705 18.8929 13.3846 18.8519C14.7115 18.4647 15.8125 17.7397 16.6875 16.6769C17.5625 15.6141 18 14.3884 18 12.9999C18 11.3333 17.4167 9.91662 16.25 8.74995C15.0833 7.58328 13.6667 6.99995 12 6.99995H11.3673L12.6134 8.2461C12.7199 8.35252 12.7731 8.47047 12.7731 8.59995C12.7731 8.72943 12.7199 8.84738 12.6134 8.9538C12.507 9.0602 12.3891 9.1134 12.2596 9.1134C12.1301 9.1134 12.0122 9.0602 11.9058 8.9538L10.0173 7.06532C9.93012 6.97816 9.8689 6.88906 9.83365 6.79802C9.79838 6.70699 9.78075 6.60763 9.78075 6.49995C9.78075 6.39225 9.79838 6.29289 9.83365 6.20188C9.8689 6.11084 9.93012 6.02173 10.0173 5.93455L11.9058 4.0461C12.0122 3.93968 12.1301 3.88647 12.2596 3.88647C12.3891 3.88647 12.507 3.93968 12.6134 4.0461C12.7199 4.15252 12.7731 4.27047 12.7731 4.39995C12.7731 4.52943 12.7199 4.64738 12.6134 4.7538L11.3673 5.99995H12C13.9513 5.99995 15.6058 6.67879 16.9635 8.03647C18.3212 9.39417 19 11.0487 19 12.9999C19 14.6499 18.4904 16.0999 17.4712 17.3499C16.4519 18.5999 15.1545 19.4282 13.5788 19.8346Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default ResetIcon;

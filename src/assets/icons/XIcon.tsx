const XIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      {...props}
      width="100%"
      height="100%"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M4 4L28 28" stroke="currentColor" strokeLinecap="round" />
      <path d="M4 28L28 3.99999" stroke="currentColor" strokeLinecap="round" />
    </svg>
  );
};
export default XIcon;

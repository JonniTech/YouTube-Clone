import { Link } from "react-router-dom";

const footerLinks = [
    ["About", "Press", "Copyright", "Contact us", "Creators", "Advertise", "Developers"],
    ["Terms", "Privacy", "Policy & Safety", "How YouTube works", "Test new features"]
];

export const Footer = () => {
    return (
        <footer className="footer bg-background px-4 py-8 md:px-6 border-t border-border/50 mt-auto flex flex-col items-center">
            <div className="flex flex-col gap-4 w-full max-w-[1700px] items-center text-center">
                <div className="flex flex-wrap gap-x-2 gap-y-1 justify-center">
                    {footerLinks[0].map((link) => (
                        <Link
                            key={link}
                            to="#"
                            className="text-[13px] font-semibold text-muted-foreground hover:text-foreground transition-colors"
                        >
                            {link}
                        </Link>
                    ))}
                </div>
                <div className="flex flex-wrap gap-x-2 gap-y-1 justify-center">
                    {footerLinks[1].map((link) => (
                        <Link
                            key={link}
                            to="#"
                            className="text-[13px] font-semibold text-muted-foreground hover:text-foreground transition-colors"
                        >
                            {link}
                        </Link>
                    ))}
                </div>
                <div className="pt-2 text-center">
                    <p className="text-[12px] text-muted-foreground/60">
                        © {new Date().getFullYear()} Google LLC • Programed by NYAGANYA
                        <br />
                        This project uses the YouTube API but is not affiliated with YouTube.
                    </p>
                </div>
            </div>
        </footer>
    );
};

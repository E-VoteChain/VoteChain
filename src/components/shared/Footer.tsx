import { Link } from 'react-router';
import { Vote } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container px-4 py-12 md:px-6">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          <div className="sm:col-span-2 lg:col-span-2">
            <Link to="/" className="mb-6 flex items-center gap-2">
              <Vote className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-primary">VoteChain</span>
            </Link>
            <p className="mb-4 max-w-xs text-muted-foreground">
              Secure, transparent, and tamper-proof voting powered by blockchain technology.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-medium">Platform</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/how-it-works" className="text-muted-foreground hover:text-foreground">
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  to="/active-elections"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Active Elections
                </Link>
              </li>
              <li>
                <Link
                  to="/upcoming-elections"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Upcoming Elections
                </Link>
              </li>
              <li>
                <Link to="/create-election" className="text-muted-foreground hover:text-foreground">
                  Create Election
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-medium">Resources</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/docs" className="text-muted-foreground hover:text-foreground">
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-foreground">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/security" className="text-muted-foreground hover:text-foreground">
                  Security
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-muted-foreground hover:text-foreground">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-medium">Company</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-foreground">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-foreground">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-foreground">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} VoteChain. All rights reserved.
            </p>
            <div className="flex items-center space-x-4">
              <Link
                to="https://github.com/E-VoteChain/VoteChain"
                className="text-muted-foreground hover:text-foreground"
              >
                GitHub
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

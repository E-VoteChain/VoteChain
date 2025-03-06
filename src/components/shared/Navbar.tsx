import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router';
import { Vote, Menu, Shield } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { getCurrentConnection } from '@/config';
import AuthContext from '@/context/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { state } = React.useContext(AuthContext);
  const is_connected = !!getCurrentConnection();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-2">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <Vote className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-primary">VoteChain</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink className={navigationMenuTriggerStyle()} href="/">
                Home
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Elections</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <li className="row-span-3">
                    <NavigationMenuLink
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-primary/50 to-primary p-6 no-underline outline-none focus:shadow-md"
                      href="/elections/active"
                    >
                      <div className="mt-4 mb-2 text-lg font-medium text-primary-foreground">
                        Active Elections
                      </div>
                      <p className="text-sm leading-tight text-primary-foreground/90">
                        View and participate in ongoing elections secured by blockchain technology
                      </p>
                    </NavigationMenuLink>
                  </li>
                  <ListItem href="/elections/past" title="Past Elections">
                    View results from completed elections
                  </ListItem>
                  <ListItem href="/elections/upcoming" title="Upcoming Elections">
                    Elections scheduled to start soon
                  </ListItem>
                  <ListItem href="/elections/create" title="Create Election">
                    Set up a new secure blockchain election
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/voter/add" className={navigationMenuTriggerStyle()}>
                Register as voter
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink className={navigationMenuTriggerStyle()} href="/about">
                About
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-4">
          {state.is_admin ? (
            <Button variant="ghost" size="sm" asChild className="hidden md:flex">
              <Link to="/admin" className='font-medium'>
                <Shield className="h-4 w-4" />
                Admin
              </Link>
            </Button>
          ) : null}
          <Button
            className="hidden md:inline-flex hover:cursor-pointer disabled:opacity-80"
            disabled={is_connected}
          >
            {is_connected ? 'Connected to wallet' : 'Connect Wallet'}
          </Button>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 py-6 px-2">
                <Link to="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                  <Vote className="h-6 w-6 text-primary" />
                  <span className="text-xl font-bold text-primary">BlockVote</span>
                </Link>
                <nav className="flex flex-col gap-4">
                  <Link to="/" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                    Home
                  </Link>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <Link
                        to="/active-elections"
                        className="text-lg font-medium"
                        onClick={() => setIsOpen(false)}
                      >
                        Elections
                      </Link>
                    </div>
                    <div className="flex flex-col gap-2 pl-4">
                      <Link
                        to="/active-elections"
                        className="text-sm"
                        onClick={() => setIsOpen(false)}
                      >
                        Active Elections
                      </Link>
                      <Link
                        to="/past-elections"
                        className="text-sm"
                        onClick={() => setIsOpen(false)}
                      >
                        Past Elections
                      </Link>
                      <Link
                        to="/upcoming-elections"
                        className="text-sm"
                        onClick={() => setIsOpen(false)}
                      >
                        Upcoming Elections
                      </Link>
                      <Link
                        to="/create-election"
                        className="text-sm"
                        onClick={() => setIsOpen(false)}
                      >
                        Create Election
                      </Link>
                    </div>
                  </div>
                  <Link
                    to="/how-it-works"
                    className="text-lg font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    How It Works
                  </Link>
                  <Link
                    to="/about"
                    className="text-lg font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    About
                  </Link>
                  <Link
                    to="/profile"
                    className="text-lg font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    My Profile
                  </Link>
                  <Link
                    to="/my-votes"
                    className="text-lg font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    My Votes
                  </Link>
                </nav>
                <Button className="w-full" onClick={() => setIsOpen(false)}>
                  Connect Wallet
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

const ListItem = ({
  className,
  title,
  children,
  ...props
}: React.ComponentPropsWithoutRef<'a'> & { title: string }) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
        </a>
      </NavigationMenuLink>
    </li>
  );
};

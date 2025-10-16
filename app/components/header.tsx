
'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { LanguageToggle } from '@/components/language-toggle'
import { ThemeToggle } from '@/components/theme-toggle'
import { useLanguage } from '@/hooks/use-language'
import { Menu, X, Briefcase, Users, MessageSquare, Sparkles, ExternalLink } from 'lucide-react'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const { t, language } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigation = [
    { name: t('home'), href: '/' },
    { name: t('about'), href: '/about' },
    { name: t('services'), href: '/services' },
    { name: t('jobs'), href: '/jobs' },
    { name: t('blog'), href: '/blog' },
    { name: t('contact'), href: '/contact' }
  ]

  return (
    <>
      {/* BrainTask Promotional Banner */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 left-0 right-0 z-[60] text-white py-2 shadow-lg"
        style={{ background: 'linear-gradient(to right, #348FBE, #5090DE)' }}
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-2 text-sm"
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="w-4 h-4" />
            <span className="font-medium">
              {language === 'es' 
                ? '¿Necesitas más herramientas de productividad? ¡Descubre BrainTask!'
                : 'Need more productivity tools? Discover BrainTask!'
              }
            </span>
          </motion.div>
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20 font-medium"
            asChild
          >
            <a href="https://braintask.net/" target="_blank" rel="noopener noreferrer" className="flex items-center">
              {language === 'es' ? 'Explorar BrainTask' : 'Explore BrainTask'} <ExternalLink className="w-3 h-3 ml-1" />
            </a>
          </Button>
        </div>
      </motion.div>

      <motion.header
        className={`fixed top-12 left-0 right-0 z-[65] transition-all duration-300 ${
          scrolled 
            ? 'bg-background/90 backdrop-blur-lg border-b border-border shadow-xl' 
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Spectacular animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-10 -left-10 w-20 h-20 rounded-full"
            style={{ backgroundColor: '#348FBE20' }}
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute -top-5 right-1/3 w-16 h-16 rounded-full"
            style={{ backgroundColor: '#FFDA6D30' }}
            animate={{
              x: [0, -50, 0],
              y: [0, 30, 0],
              scale: [1, 0.8, 1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
          <motion.div
            className="absolute top-5 right-10 w-12 h-12 rounded-full"
            style={{ backgroundColor: '#5090DE30' }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 py-4">
            {/* Logo Espectacular */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <Link href="/" className="flex items-center">
                <motion.div 
                  className="relative"
                  whileHover={{ rotate: [0, -2, 2, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Sparkle effect */}
                  <motion.div
                    className="absolute -top-1 -right-1 w-3 h-3 z-10"
                    animate={{ scale: [0, 1, 0], rotate: [0, 180, 360] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Sparkles className="w-3 h-3 text-yellow-500" />
                  </motion.div>
                  <Image
                    src="/vonnect-logo.png"
                    alt="Vonnect Logo"
                    width={240}
                    height={65}
                    className="h-16 w-auto"
                    priority
                  />
                </motion.div>
              </Link>
            </motion.div>

            {/* Desktop Navigation - A la izquierda */}
            <div className="hidden md:flex flex-1 justify-start ml-12">
              <nav className="flex items-center space-x-6">
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    <Link
                      href={item.href}
                      className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 relative group ${
                        pathname === item.href
                          ? 'bg-primary/10 text-primary shadow-md'
                          : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                      }`}
                    >
                      {item.name}
                      <motion.div
                        className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ background: 'linear-gradient(to right, #348FBE20, #FFDA6D20)' }}
                        whileHover={{ scale: 1.05 }}
                      />
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </div>

            {/* Desktop Actions - A la derecha */}
            <div className="hidden md:flex items-center space-x-6">
              <ThemeToggle />
              <LanguageToggle />
              
              <div className="flex items-center space-x-3">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/companies" className="flex items-center group">
                    <Briefcase className="w-4 h-4 mr-2 group-hover:animate-bounce" />
                    {t('forCompanies')}
                  </Link>
                </Button>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="sm" className="shadow-lg text-white hover:opacity-90" style={{ background: 'linear-gradient(to right, #348FBE, #5090DE)' }} asChild>
                    <Link href="/candidates" className="flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      {t('forCandidates')}
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-3">
              <ThemeToggle />
              <LanguageToggle />
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="relative z-[75]"
                  style={{ color: isMenuOpen ? '#348FBE' : 'inherit' }}
                >
                  <motion.div
                    animate={{ rotate: isMenuOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                  </motion.div>
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <motion.div
              className="md:hidden absolute top-full left-0 right-0 z-[70]"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mx-4 mt-2 px-4 pt-4 pb-4 space-y-2 bg-background/98 backdrop-blur-lg rounded-lg border border-border shadow-2xl">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block px-4 py-3 text-base font-medium rounded-lg transition-colors duration-200 ${
                      pathname === item.href
                        ? 'text-white shadow-lg' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    }`}
                    style={pathname === item.href ? { background: 'linear-gradient(to right, #348FBE, #5090DE)' } : {}}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="border-t border-border pt-3 mt-3 space-y-2">
                  <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
                    <Link href="/companies" className="flex items-center">
                      <Briefcase className="w-4 h-4 mr-2" />
                      {t('forCompanies')}
                    </Link>
                  </Button>
                  <Button size="sm" className="w-full text-white hover:opacity-90" style={{ background: 'linear-gradient(to right, #348FBE, #5090DE)' }} asChild>
                    <Link href="/candidates" className="flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      {t('forCandidates')}
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.header>
    </>
  )
}

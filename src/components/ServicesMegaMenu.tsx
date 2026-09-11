'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useMemo, useState } from 'react'
import MenuArrow from '@/assets/menu-arrow.svg'
import type { MegaMenu, MegaMenuCategory } from '@/lib/navigation'
import { normalizeHexColor } from '@/lib/navigation'

type ServicesMegaMenuProps = {
  megaMenu: MegaMenu
  onNavigate?: () => void
}

function splitIntoColumns<T>(items: T[]) {
  const splitAt = Math.ceil((items.length + 1) / 2)
  return [items.slice(0, splitAt), items.slice(splitAt)] as const
}

type MenuItemLinkProps = {
  item: MegaMenuCategory['items'][number]
  activeColor: string
  onNavigate?: () => void
}

function MenuItemLink({ item, activeColor, onNavigate }: MenuItemLinkProps) {
  return (
    <Link
      href={item.href}
      target={item.openInNewTab ? '_blank' : undefined}
      rel={item.openInNewTab ? 'noopener noreferrer' : undefined}
      onClick={onNavigate}
      className="group flex min-w-0 translate-x-0 items-start gap-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:translate-x-2"
    >
      {item.icon?.url ? (
        <Image
          src={item.icon.url}
          alt={item.icon.alt || item.label}
          width={40}
          height={40}
          unoptimized
          className="h-10 w-10 shrink-0 object-contain"
          style={{ background: 'transparent' }}
        />
      ) : (
        <span className="flex h-10 w-10 shrink-0 items-center justify-center">
          <span className="h-2 w-2 rounded-full" style={{ background: activeColor }} />
        </span>
      )}

      <div className="min-w-0 flex-1">
        <p className="text-[16px] font-medium leading-snug tracking-[-0.05em] text-white">
          {item.label}
        </p>
        {item.subtext && (
          <p className="mt-1 text-[14px] font-normal leading-snug tracking-[-0.03em] text-white/80">
            {item.subtext}
          </p>
        )}
      </div>
    </Link>
  )
}

export default function ServicesMegaMenu({ megaMenu, onNavigate }: ServicesMegaMenuProps) {
  const categories = useMemo(
    () => megaMenu.categories.filter((category) => category.items?.length),
    [megaMenu.categories]
  )

  const [activeIndex, setActiveIndex] = useState(0)
  const activeCategory: MegaMenuCategory | undefined = categories[activeIndex] ?? categories[0]
  const activeColor = normalizeHexColor(activeCategory?.hoverColor)
  const [columnOne, columnTwo] = useMemo(
    () => splitIntoColumns(activeCategory?.items ?? []),
    [activeCategory?.items]
  )

  if (!activeCategory) return null

  // Longer industry labels need a wider tab column so the arrow stays inside
  const tabColumnPx = categories.some((category) => category.label.length > 18) ? 420 : 318

  return (
    <div
      className="w-[min(1120px,calc(100vw-40px))] overflow-hidden rounded-[24px] border border-white/[0.08]"
      style={{
        background: 'rgba(10, 10, 12, 0.5)',
        backdropFilter: 'blur(40px)',
        WebkitBackdropFilter: 'blur(40px)',
      }}
      onMouseLeave={() => setActiveIndex(0)}
    >
      <div className="grid" style={{ gridTemplateColumns: `${tabColumnPx}px 1fr` }}>
        {/* Categories */}
        <div className="border-r border-white/[0.08] p-6">
          <div className="flex flex-col gap-1.5">
            {categories.map((category, index) => {
              const isActive = index === activeIndex
              const color = normalizeHexColor(category.hoverColor)

              return (
                <div
                  key={category.label}
                  onMouseEnter={() => setActiveIndex(index)}
                  className="flex w-full items-center justify-start gap-4 rounded-[12px] px-5 py-3.5 text-left text-[16px] font-medium leading-none tracking-[-0.05em] transition-[background-color,color] duration-300 ease-out"
                  style={{
                    background: isActive ? color : 'transparent',
                    color: isActive ? '#0A0A0C' : 'rgba(255,255,255,0.55)',
                  }}
                >
                  {category.href ? (
                    <Link href={category.href} onClick={onNavigate} className="min-w-0">
                      {category.label}
                    </Link>
                  ) : (
                    <span className="min-w-0">{category.label}</span>
                  )}
                  <span className="flex h-5 w-[25px] shrink-0 items-center justify-start">
                    <Image
                      src={MenuArrow}
                      alt=""
                      width={25}
                      height={20}
                      aria-hidden
                      className={`h-5 w-auto transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        isActive
                          ? 'translate-x-0 opacity-100'
                          : '-translate-x-3 opacity-0'
                      }`}
                    />
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Links — column-first layout */}
        <div className="p-6">
          <div className="flex gap-8">
            <div className="flex min-w-0 flex-1 flex-col gap-8">
              {columnOne.map((item) => (
                <MenuItemLink
                  key={`${activeCategory.label}-${item.label}-${item.href}`}
                  item={item}
                  activeColor={activeColor}
                  onNavigate={onNavigate}
                />
              ))}
            </div>
            {columnTwo.length > 0 && (
              <div className="flex min-w-0 flex-1 flex-col gap-8">
                {columnTwo.map((item) => (
                  <MenuItemLink
                    key={`${activeCategory.label}-${item.label}-${item.href}`}
                    item={item}
                    activeColor={activeColor}
                    onNavigate={onNavigate}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

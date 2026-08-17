'use client'

import { Button } from '@/components/ui/button'

import Image from 'next/image'
import { Badges } from '@/domains/user/type'


import { useController, useFormContext } from "react-hook-form"
import { ProfileFormValues } from '@/domains/user/validation'
import { useGetUserProfile } from '@/domains/user/hooks/profile/useGetProfile'

const BadgeSelector = ({ userId }: { userId: string }) => {

  const { control } = useFormContext<ProfileFormValues>()

  const { userData } = useGetUserProfile(userId)

  const badges = userData?.userProfile?.badges

  const { field } = useController({
    name: "selectedBadges",
    control,
  })

  const selected = field.value ?? []

  const toggle = (id: string) => {
    if (selected.includes(id)) {
      field.onChange(
        selected.filter((badgeId: string) => badgeId !== id)
      )

      return
    }

    if (selected.length >= 3) {
      return
    }

    field.onChange([...selected, id])
  }

  return (
    <div className="mt-6">
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold">
            Showcase Badges
          </h3>

          {badges?.length > 0 && (
            <span className="text-xs text-muted-foreground">
              {selected.length}/3 selected
            </span>
          )}
        </div>

        {badges?.length > 0 && (
          <p className="mt-1 text-xs text-muted-foreground">
            Choose up to 3 badges to display on your profile.
          </p>
        )}
      </div>

      {/* Empty state */}
      {!badges?.length ? (
        <div className="rounded-lg border border-dashed p-6 text-center">
          <div className="text-sm font-medium">
            No badges earned yet
          </div>

          <p className="mt-1 text-xs text-muted-foreground">
            Earn badges by completing achievements and activities.
          </p>
        </div>
      ) : (
        /* Badge selector */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {badges.map((badge: Badges) => {
            const isSelected = selected.includes(badge.id)
            const maxReached = selected.length >= 3

            return (
              <Button
                type="button"
                key={badge.id}
                variant="ghost"
                onClick={() => toggle(badge.id)}
                disabled={!isSelected && maxReached}
                className={`
              relative h-auto justify-start p-3
              rounded-xl border
              transition-all
              ${isSelected
                    ? "border-primary bg-primary/5 shadow-sm"
                    : "border-border hover:border-primary/40 hover:bg-muted/50"
                  }
              ${!isSelected && maxReached
                    ? "opacity-50"
                    : ""
                  }
            `}
              >
                {/* Selected indicator */}
                {isSelected && (
                  <div className="absolute right-2 top-2">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">
                      ✓
                    </div>
                  </div>
                )}

                {/* Badge icon */}
                <div
                  className={`
                flex h-10 w-10 shrink-0 items-center justify-center
                rounded-lg
                ${isSelected
                      ? "bg-primary/10"
                      : "bg-muted"
                    }
              `}
                >
                  <Image
                    src={badge.icon}
                    alt={badge.name}
                    width={28}
                    height={28}
                    className="h-7 w-7 object-contain"
                  />
                </div>

                {/* Badge information */}
                <div className="flex min-w-0 flex-col items-start ml-3">
                  <span className="text-sm font-medium truncate">
                    {badge.name}
                  </span>

                  <span className="text-xs text-muted-foreground">
                    {isSelected ? "Showcased" : "Click to showcase"}
                  </span>
                </div>
              </Button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default BadgeSelector

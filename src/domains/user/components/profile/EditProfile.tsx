
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Loader2, PlusCircle } from 'lucide-react';
import { FormProvider } from 'react-hook-form'
import { z } from 'zod';
import { useGetUserProfile } from '../../hooks/profile/useGetProfile';
import { useProfileForm } from '../../hooks/profile/useProfileForm';
import { useResetProfileForm } from '../../hooks/profile/useResetProfileForm';
import { useCheckUsername } from '../../hooks/profile/useCheckUsername';
import { useDebounce } from '@/helpers/useDebounce';
import { useProfileFromMutation } from '../../hooks/profile/useProfileFormMutaion';
import { updateUserSchema } from '../../validation';
import AvatarFormField from './_components/AvatarFormField';
import UsernameFormField from './_components/UsernameFormField';
import EmailFormField from './_components/EmailFormField';
import CoverImageFormField from './_components/CoverImageField';
import EditFormHeader from './_components/EditFormHeader';

const EditProfile = ({ userId }: { userId: string }) => {

    const { userData } = useGetUserProfile(userId)


    const form = useProfileForm()

    useResetProfileForm(form, userData.userProfile)

    const username = form.watch("username") ?? "";

    const { debouncedValue } = useDebounce(username, 500);

    const {
        data: usernameData,
        // isPending: isCheckingUsername,
    } = useCheckUsername({
        username: debouncedValue,
        currentUsername: userData?.userProfile.username,
    });

    const mutation = useProfileFromMutation(form)

    const onSubmit = (data: z.infer<typeof updateUserSchema>) => {
        mutation.mutate(data);
    };

    return (
        <Dialog >
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    className="w-full justify-start gap-3 border-dashed border-2 hover:border-primary/50 hover:bg-primary/5 transition-all py-6"
                >
                    <PlusCircle className="h-4 w-4 text-primary" />
                    <span className="font-bold tracking-tight">Update User Profile</span>
                </Button>
            </DialogTrigger>

            <DialogContent className="flex max-h-[90vh] flex-col overflow-hidden p-0 sm:max-w-180">
                {/* Visual Progress/Accent Bar */}
                <div className="h-1.5 w-full bg-muted overflow-hidden">
                    <div
                        className={`h-full bg-linear-to-r from-primary via-purple-500 to-blue-500 transition-all duration-500 ${mutation.isPending ? "w-full animate-pulse" : "w-0"
                            }`}
                    />
                </div>

                <div className="p-8">
                    <EditFormHeader />

                    <FormProvider {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)} className="max-h-[60vh] space-y-6 overflow-y-auto pr-2">

                            <AvatarFormField />

                            <CoverImageFormField />

                            {/* Username Field */}
                            <UsernameFormField
                                mutationPending={mutation.isPending}
                                currentUsername={userData?.userProfile.username}
                                usernameData={usernameData}
                                debouncedValue={debouncedValue}
                            />

                            {/* Email Field */}
                            <EmailFormField
                                mutationPendding={mutation.isPending}
                            />

                            {/* Actions */}
                            <div className="pt-4">
                                <Button
                                    type="submit"
                                    disabled={mutation.isPending}
                                    className="w-full rounded-xl h-14 font-bold shadow-lg shadow-primary/20 transition-all active:scale-[0.98] text-base"
                                >
                                    {mutation.isPending ? (
                                        <>
                                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                            Synchronizing...
                                        </>
                                    ) : (
                                        "Save Profile Changes"
                                    )}
                                </Button>
                            </div>
                        </form>
                    </FormProvider>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default EditProfile
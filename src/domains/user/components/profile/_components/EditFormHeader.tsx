import { DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'

const EditFormHeader = () => {
    return (
        <div>
            <DialogHeader className="mb-8">
                <div className="flex items-center gap-3 mb-2">

                    <DialogTitle className="text-2xl font-black tracking-tight">
                        Account Settings
                    </DialogTitle>
                </div>
                <DialogDescription className="text-muted-foreground leading-relaxed">
                    Fine-tune your professional presence. Changes will reflect across all
                    technical collections.
                </DialogDescription>
            </DialogHeader></div>
    )
}

export default EditFormHeader
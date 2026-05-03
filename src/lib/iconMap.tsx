import {
    Newspaper, CreditCard, Flag, Image, Heart, FileText, Tag, Calendar,
    Pencil, Paperclip, Building2, QrCode, Wallet, Landmark, Printer,
    Sparkles, Banknote, Truck, Shield, Package, Gift, Smartphone, User,
    FolderOpen, Flame, MessageCircle,
    type LucideProps
} from 'lucide-react';
import type { ElementType } from 'react';

const iconMap: Record<string, ElementType> = {
    Newspaper, CreditCard, Flag, Image, Heart, FileText, Tag, Calendar,
    Pencil, Paperclip, Building2, QrCode, Wallet, Landmark, Printer,
    Sparkles, Banknote, Truck, Shield, Package, Gift, Smartphone, User,
    FolderOpen, Flame, MessageCircle,
};

interface IconProps extends LucideProps {
    name: string;
}

export function Icon({ name, size = 20, ...props }: IconProps) {
    const LucideIcon = iconMap[name];
    if (!LucideIcon) return null;
    return <LucideIcon size={size} {...props} />;
}

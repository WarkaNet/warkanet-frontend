import type { LucideIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface QuickActionButtonProps {
    icon: LucideIcon;
    label: string;
    description: string;
    navigateTo: string;
    variant: 'green' | 'blue';
}

export default function QuickActionButton({
    icon: Icon,
    label,
    description,
    navigateTo,
    variant,
}: QuickActionButtonProps) {
    const navigate = useNavigate();

    const gradients = {
        green: 'bg-gradient-green',
        blue: 'bg-gradient-indigo',
    };

    const glows = {
        green: 'shadow-glow-green',
        blue: 'shadow-glow-indigo',
    };

    return (
        <motion.button
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(navigateTo)}
            className={`
        ${gradients[variant]}
        rounded-2xl p-6 sm:p-8
        text-left w-full
        shadow-lg hover:shadow-xl
        dark:${glows[variant]}
        transition-all duration-300
        border border-white/20
      `}
        >
            <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                        <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                            <Icon className="w-8 h-8 text-white" strokeWidth={2.5} />
                        </div>
                        <h3 className="text-2xl font-bold text-white">
                            {label}
                        </h3>
                    </div>
                    <p className="text-white/90 font-medium">
                        {description}
                    </p>
                </div>

                <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                >
                    <ArrowRight className="w-6 h-6 text-white" strokeWidth={2.5} />
                </motion.div>
            </div>
        </motion.button>
    );
}

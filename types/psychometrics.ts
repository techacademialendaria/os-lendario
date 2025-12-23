export interface PsychometricProfile {
    name: string;
    mbti: {
        type: string;
        role: string;
        function_stack: string[];
    };
    enneagram: {
        type: string;
        wing: string;
        triad: string;
        variant: string;
    };
    disc?: {
        pattern: string;
        d: number; // 0-100
        i: number;
        s: number;
        c: number;
    };
    bigFive?: {
        openness: number; // 0-100
        conscientiousness: number;
        extraversion: number;
        agreeableness: number;
        neuroticism: number;
    };
    darkTriad?: {
        narcissism: number; // 1-7
        machiavellianism: number;
        psychopathy: number;
    };
    cognitiveStratum?: string; // e.g., "VI-VII"
    philosophy: {
        core: string;
        mantra: string;
    };
    aptitudes: {
        superpowers: string[];
        kryptonite?: string;
        zone_of_genius: {
            title: string;
            description: string;
        };
    };
    interaction_guide: {
        communication_style: {
            optimal: string;
            avoid: string;
        };
    };
}

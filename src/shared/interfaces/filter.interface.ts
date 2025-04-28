export interface Filter {
    id: string;
    title: string;
    options: Option[];
};

interface Option {
    label: string;
    value: string;
};

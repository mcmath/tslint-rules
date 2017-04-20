export interface EnumMemberNameOption {
  option: string;
  description: string;
  validate: (str: string) => boolean;
}

/**
 * A list of option definitions. The first option is the default option.
 */
export const ENUM_MEMBER_NAME_OPTIONS: EnumMemberNameOption[] = [
  {
    option: "pascal-case",
    description: "PascalCase",
    validate: (str: string) => /^[A-Z][0-9A-Za-z]*$/.test(str) && (str.length === 1 || /[a-z]/.test(str))
  },
  {
    option: "camel-case",
    description: "camelCase",
    validate: (str: string) => /^[a-z][0-9A-Za-z]*$/.test(str)
  },
  {
    option: "caps-case",
    description: "CAPS_CASE",
    validate: (str: string) => /^[A-Z][0-9A-Z_]*[0-9A-Z]$|^[A-Z]$/.test(str)
  },
  {
    option: "snake-case",
    description: "snake_case",
    validate: (str: string) => /^[a-z][0-9a-z_]*[0-9a-z]$|^[a-z]$/.test(str)
  }
];

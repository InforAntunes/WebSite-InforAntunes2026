export type LeadFormType = "robotics" | "payments" | "managementSoftware" | "serviceQuote" | "timeTracking" | "cybersecurityInfrastructure"

export type LeadSource = "robotics" | "payments" | "cashlogy" | "compact" | "xd" | "winrest" | "zonesoft" | "services" | "sistema-ponto" | "ciberseguranca-infraestrutura"

export type LeadFieldName = "company" | "contact" | "businessType" | "nif" | "dailyRevenue" | "software" | "paymentPoints" | "needs" | "services" | "description" | "equipmentCount" | "employeeCount" | "phone" | "email"

export type LeadFieldConfig = {
  name: LeadFieldName
  type: "text" | "email" | "tel" | "textarea" | "select" | "multiselect"
  labelKey: string
  placeholderKey?: string
  optionsKey?: string
  required: boolean
  autoComplete?: string
  inputMode?: "numeric" | "tel"
  fullWidth?: boolean
}

export type LeadFormConfig = {
  type: LeadFormType
  leadOrigin: string
  translationRoot: string
  titleKey: string
  descriptionKey: string
  solutionLabelKey: string
  submitKey: string
  successMessageKey: string
  fields: LeadFieldConfig[]
}

const identityFields: LeadFieldConfig[] = [
  {
    name: "company",
    type: "text",
    labelKey: "common.fields.company.label",
    placeholderKey: "common.fields.company.placeholder",
    required: true,
    autoComplete: "organization",
  },
  {
    name: "contact",
    type: "text",
    labelKey: "common.fields.contact.label",
    placeholderKey: "common.fields.contact.placeholder",
    required: true,
    autoComplete: "name",
  },
]

const contactFields: LeadFieldConfig[] = [
  {
    name: "phone",
    type: "tel",
    labelKey: "common.fields.phone.label",
    placeholderKey: "common.fields.phone.placeholder",
    required: true,
    autoComplete: "tel",
    inputMode: "tel",
  },
  {
    name: "email",
    type: "email",
    labelKey: "common.fields.email.label",
    placeholderKey: "common.fields.email.placeholder",
    required: true,
    autoComplete: "email",
  },
]

export const leadFormConfigs: Record<LeadFormType, LeadFormConfig> = {
  cybersecurityInfrastructure: {
    type: "cybersecurityInfrastructure",
    leadOrigin: "ciberseguranca-infraestrutura",
    translationRoot: "cybersecurityInfrastructure",
    titleKey: "cybersecurityInfrastructure.title",
    descriptionKey: "cybersecurityInfrastructure.description",
    solutionLabelKey: "cybersecurityInfrastructure.solutionLabel",
    submitKey: "cybersecurityInfrastructure.submit",
    successMessageKey: "cybersecurityInfrastructure.successMessage",
    fields: [
      ...identityFields,
      {
        name: "businessType",
        type: "select",
        labelKey: "common.fields.businessType.label",
        optionsKey: "managementSoftware.businessOptions",
        required: true,
      },
      {
        name: "equipmentCount",
        type: "select",
        labelKey: "cybersecurityInfrastructure.equipmentCount.label",
        optionsKey: "cybersecurityInfrastructure.equipmentCount.options",
        required: true,
      },
      {
        name: "needs",
        type: "select",
        labelKey: "cybersecurityInfrastructure.needs.label",
        optionsKey: "cybersecurityInfrastructure.needs.options",
        required: true,
        fullWidth: true,
      },
      ...contactFields,
    ],
  },
  robotics: {
    type: "robotics",
    leadOrigin: "service-robotics",
    translationRoot: "robotics",
    titleKey: "robotics.title",
    descriptionKey: "robotics.description",
    solutionLabelKey: "robotics.solutionLabel",
    submitKey: "robotics.submit",
    successMessageKey: "common.success.message",
    fields: [
      ...identityFields,
      {
        name: "businessType",
        type: "select",
        labelKey: "common.fields.businessType.label",
        optionsKey: "robotics.businessOptions",
        required: true,
      },
      {
        name: "nif",
        type: "text",
        labelKey: "common.fields.nif.label",
        placeholderKey: "common.fields.nif.placeholder",
        required: false,
        inputMode: "numeric",
      },
      {
        name: "dailyRevenue",
        type: "select",
        labelKey: "common.fields.dailyRevenue.label",
        optionsKey: "common.revenueOptions",
        required: true,
      },
      {
        name: "software",
        type: "text",
        labelKey: "common.fields.software.label",
        placeholderKey: "common.fields.software.placeholder",
        required: true,
      },
      ...contactFields,
    ],
  },
  payments: {
    type: "payments",
    leadOrigin: "automated-payments",
    translationRoot: "payments",
    titleKey: "payments.title",
    descriptionKey: "payments.description",
    solutionLabelKey: "payments.solutionLabel",
    submitKey: "payments.submit",
    successMessageKey: "common.success.message",
    fields: [
      ...identityFields,
      {
        name: "businessType",
        type: "select",
        labelKey: "common.fields.businessType.label",
        optionsKey: "payments.businessOptions",
        required: true,
      },
      {
        name: "nif",
        type: "text",
        labelKey: "common.fields.nif.label",
        placeholderKey: "common.fields.nif.placeholder",
        required: false,
        inputMode: "numeric",
      },
      {
        name: "paymentPoints",
        type: "select",
        labelKey: "payments.paymentPoints.label",
        optionsKey: "payments.paymentPoints.options",
        required: true,
      },
      {
        name: "software",
        type: "text",
        labelKey: "common.fields.softwarePos.label",
        placeholderKey: "common.fields.softwarePos.placeholder",
        required: true,
      },
      {
        name: "dailyRevenue",
        type: "select",
        labelKey: "common.fields.dailyRevenue.label",
        optionsKey: "common.revenueOptions",
        required: true,
      },
      ...contactFields,
    ],
  },
  managementSoftware: {
    type: "managementSoftware",
    leadOrigin: "management-software",
    translationRoot: "managementSoftware",
    titleKey: "managementSoftware.title",
    descriptionKey: "managementSoftware.description",
    solutionLabelKey: "managementSoftware.solutionLabel",
    submitKey: "managementSoftware.submit",
    successMessageKey: "common.success.message",
    fields: [
      ...identityFields,
      {
        name: "businessType",
        type: "select",
        labelKey: "common.fields.businessType.label",
        optionsKey: "managementSoftware.businessOptions",
        required: true,
      },
      {
        name: "nif",
        type: "text",
        labelKey: "common.fields.nif.label",
        placeholderKey: "common.fields.nif.placeholder",
        required: false,
        inputMode: "numeric",
      },
      {
        name: "paymentPoints",
        type: "select",
        labelKey: "managementSoftware.salesPoints.label",
        optionsKey: "managementSoftware.salesPoints.options",
        required: true,
      },
      {
        name: "software",
        type: "text",
        labelKey: "managementSoftware.currentSoftware.label",
        placeholderKey: "managementSoftware.currentSoftware.placeholder",
        required: false,
      },
      {
        name: "needs",
        type: "multiselect",
        labelKey: "managementSoftware.needs.label",
        optionsKey: "managementSoftware.needs.options",
        required: true,
      },
      ...contactFields,
    ],
  },
  serviceQuote: {
    type: "serviceQuote",
    leadOrigin: "services",
    translationRoot: "serviceQuote",
    titleKey: "serviceQuote.title",
    descriptionKey: "serviceQuote.description",
    solutionLabelKey: "serviceQuote.solutionLabel",
    submitKey: "serviceQuote.submit",
    successMessageKey: "serviceQuote.successMessage",
    fields: [
      ...identityFields,
      {
        name: "businessType",
        type: "select",
        labelKey: "common.fields.businessType.label",
        optionsKey: "managementSoftware.businessOptions",
        required: true,
      },
      {
        name: "services",
        type: "multiselect",
        labelKey: "serviceQuote.services.label",
        optionsKey: "serviceQuote.services.options",
        required: true,
        fullWidth: true,
      },
      {
        name: "description",
        type: "textarea",
        labelKey: "serviceQuote.needDescription.label",
        placeholderKey: "serviceQuote.needDescription.placeholder",
        required: true,
        fullWidth: true,
      },
      {
        name: "equipmentCount",
        type: "text",
        labelKey: "serviceQuote.equipmentCount.label",
        placeholderKey: "serviceQuote.equipmentCount.placeholder",
        required: false,
        inputMode: "numeric",
      },
      ...contactFields,
    ],
  },
  timeTracking: {
    type: "timeTracking",
    leadOrigin: "sistema-ponto",
    translationRoot: "timeTracking",
    titleKey: "timeTracking.title",
    descriptionKey: "timeTracking.description",
    solutionLabelKey: "timeTracking.solutionLabel",
    submitKey: "timeTracking.submit",
    successMessageKey: "timeTracking.successMessage",
    fields: [
      ...identityFields,
      {
        name: "employeeCount",
        type: "select",
        labelKey: "timeTracking.employeeCount.label",
        optionsKey: "timeTracking.employeeCount.options",
        required: true,
      },
      {
        name: "businessType",
        type: "select",
        labelKey: "common.fields.businessType.label",
        optionsKey: "managementSoftware.businessOptions",
        required: true,
      },
      ...contactFields,
    ],
  },
}

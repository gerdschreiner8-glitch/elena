export interface ProfileData {
  v: string; // Vorname
  n: string; // Nachname
  d: string; // Geburtsdatum
  pers: string; // Personen
  s: string; // Straße
  o: string; // Ort
  e: string; // Email
  t: string; // Telefon
  a: string; // Aktenzeichen
  f: string; // Fluchtgrund
  sig: string; // Signature base64
  hasSig: boolean;
  vollmacht_sent: boolean;
  isPro?: boolean;
}

export const getProfileData = (): ProfileData => {
  try {
    return JSON.parse(localStorage.getItem('app_profile_v2') || '{}');
  } catch(e) { 
    return {} as ProfileData; 
  }
};

export const saveProfileData = (data: Partial<ProfileData>) => {
  const current = getProfileData();
  const updated = { ...current, ...data };
  localStorage.setItem('app_profile_v2', JSON.stringify(updated));
};

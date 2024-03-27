import { AbstractControl, ValidatorFn } from '@angular/forms';

export function imageDimensionsValidator(maxWidth: number, maxHeight: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const file = control.value;
    if (!file || !(file instanceof File)) {
      return null; // No file selected or not a File object, so validation should pass
    }

    return new Promise(resolve => {
      const reader = new FileReader();

      reader.onload = (event: ProgressEvent<FileReader>) => {
        const img = new Image();
        img.onload = () => {
          if (img.width <= maxWidth && img.height <= maxHeight) {
            resolve(null); // Image dimensions are valid
          } else {
            resolve({ invalidDimensions: true }); // Image dimensions are invalid
          }
        };
        img.src = event.target?.result as string;
      };

      reader.readAsDataURL(file);
    });
  };
}

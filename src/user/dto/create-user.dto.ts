export class CreateUserDto {
  role_id: string;
  employee_id: string | null;
  //company_id: string | null;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  profile_image_url: string | null;
}

import { Pipe, PipeTransform } from '@angular/core';
import { UserModel } from '../../../models/user.model';

@Pipe({
  name: 'userFilter',
  standalone: true
})
export class UserFilterPipe implements PipeTransform {
  transform(users: UserModel[], search: string): UserModel[] {
    if (!search) return users;
    const lower = search.toLowerCase();
    return users.filter(user =>
      user.pseudo.toLowerCase().includes(lower) ||
      user.mail.toLowerCase().includes(lower)
    );
  }
} 
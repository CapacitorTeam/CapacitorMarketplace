import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

import { User } from './entities/user.entity';
import { Follow } from './entities/follow.entity';
import { Favorite } from './entities/favorite.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { MailService } from '../mail/mail.service';

/**
 * Service responsible for user-related operations
 */
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Follow)
    private followsRepository: Repository<Follow>,
    @InjectRepository(Favorite)
    private favoritesRepository: Repository<Favorite>,
    private mailService: MailService,
  ) {}

  /**
   * Create a new user with hashed password and send verification email
   * @param createUserDto - User creation data
   * @returns The created user
   */
  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    // Check if the user with this email already exists
    const existingUser = await this.usersRepository.findOne({
      where: { email: createUserDto.email }
    });

    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    // Hash the password
    const passwordHash = await bcrypt.hash(createUserDto.password, 10);

    // Create a new user
    const user = this.usersRepository.create({
      id: uuid(),
      email: createUserDto.email,
      passwordHash,
      displayName: createUserDto.displayName,
      bio: createUserDto.bio,
      role: 'member',
    });

    // Save the user
    const savedUser = await this.usersRepository.save(user);

    // Send verification email
    await this.mailService.sendVerificationEmail(savedUser.email);

    return new UserResponseDto(savedUser);
  }

  /**
   * Find all users
   * @returns List of users
   */
  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.usersRepository.find();
    return users.map(user => new UserResponseDto(user));
  }

  /**
   * Find a user by ID with detailed profile information
   * @param id - User ID
   * @returns User with profile details
   */
  async findOne(id: string): Promise<UserResponseDto> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['assets'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // Get follower count
    const followerCount = await this.followsRepository.count({
      where: { followedUserId: id },
    });

    // Get users following count
    const followingCount = await this.followsRepository.count({
      where: { followingUserId: id },
    });

    return new UserResponseDto({
      ...user,
      followerCount,
      followingCount,
    });
  }

  /**
   * Update a user by ID
   * @param id - User ID
   * @param updateUserDto - User update data
   * @returns Updated user
   */
  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // If email is changed, update it and reset validation
    if (updateUserDto.email && updateUserDto.email !== user.email) {
      // Check if the new email is already in use
      const existingUser = await this.usersRepository.findOne({
        where: { email: updateUserDto.email },
      });

      if (existingUser && existingUser.id !== id) {
        throw new BadRequestException('Email is already in use');
      }

      user.email = updateUserDto.email;
      user.validatedAt = null;

      // Send verification email for the new email
      await this.mailService.sendVerificationEmail(updateUserDto.email);
    }

    // If a password is provided, hash it
    if (updateUserDto.password) {
      user.passwordHash = await bcrypt.hash(updateUserDto.password, 10);
    }

    // Update other fields
    if (updateUserDto.displayName) {
      user.displayName = updateUserDto.displayName;
    }

    if (updateUserDto.bio !== undefined) {
      user.bio = updateUserDto.bio;
    }

    // Save the updated user
    const updatedUser = await this.usersRepository.save(user);

    return new UserResponseDto(updatedUser);
  }

  /**
   * Delete a user by ID
   * @param id - User ID
   * @returns Void
   */
  async remove(id: string): Promise<void> {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    await this.usersRepository.remove(user);
  }

  /**
   * Verify a user's email address
   * @param token - Verification token
   * @returns Updated user
   */
  async verifyEmail(token: string): Promise<UserResponseDto> {
    // In a real application, you would decode the token to get the user ID
    // For this example, we'll assume the token is the user ID for simplicity
    const user = await this.usersRepository.findOne({ where: { id: token } });

    if (!user) {
      throw new NotFoundException('Invalid verification token');
    }

    // Update validated_at timestamp
    user.validatedAt = new Date();
    const updatedUser = await this.usersRepository.save(user);

    return new UserResponseDto(updatedUser);
  }
}

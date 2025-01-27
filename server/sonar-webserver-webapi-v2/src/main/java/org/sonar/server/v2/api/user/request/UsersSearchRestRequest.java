/*
 * SonarQube
 * Copyright (C) 2009-2023 SonarSource SA
 * mailto:info AT sonarsource DOT com
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */
package org.sonar.server.v2.api.user.request;

import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Schema;
import javax.annotation.Nullable;

public record UsersSearchRestRequest(
  @Parameter(
    description = "Return active/inactive users",
    schema = @Schema(defaultValue = "true", implementation = Boolean.class))
  Boolean active,
  @Nullable
  @Parameter(description = "Return managed or non-managed users. Only available for managed instances, throws for non-managed instances")
  Boolean managed,
  @Nullable
  @Parameter(description = "Filter on login, name and email.\n"
    + "This parameter can either perform an exact match, or a partial match (contains), it is case insensitive.")
  String q,
  @Nullable
  @Parameter(description = "Filter the users based on the last connection date field. Only users who interacted with this instance at or after the date will be returned. "
    + "The format must be ISO 8601 datetime format (YYYY-MM-DDThh:mm:ss±hhmm)",
    example = "2020-01-01T00:00:00+0100")
  String sonarQubeLastConnectionDateFrom,
  @Nullable
  @Parameter(description = "Filter the users based on the last connection date field. Only users that never connected or who interacted with this instance at "
    + "or before the date will be returned. The format must be ISO 8601 datetime format (YYYY-MM-DDThh:mm:ss±hhmm)",
    example = "2020-01-01T00:00:00+0100")
  String sonarQubeLastConnectionDateTo,
  @Nullable
  @Parameter(description = "Filter the users based on the sonar lint last connection date field Only users who interacted with this instance using SonarLint at or after "
    + "the date will be returned. The format must be ISO 8601 datetime format (YYYY-MM-DDThh:mm:ss±hhmm)",
    example = "2020-01-01T00:00:00+0100")
  String sonarLintLastConnectionDateFrom,
  @Nullable
  @Parameter(description = "Filter the users based on the sonar lint last connection date field. Only users that never connected or who interacted with this instance "
    + "using SonarLint at or before the date will be returned. The format must be ISO 8601 datetime format (YYYY-MM-DDThh:mm:ss±hhmm)",
    example = "2020-01-01T00:00:00+0100")
  String sonarLintLastConnectionDateTo

) {

}
